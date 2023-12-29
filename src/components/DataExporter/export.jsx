import { Button, Select, Space, Table, DatePicker, Form } from "antd";
import { useEffect, useState } from "react";
import { api } from "../../../axiosService";
import { useDispatch, useSelector } from "react-redux";
import { getFilterData } from "../../../store/Exporter/Thunks";
const { RangePicker } = DatePicker;
import { CSVLink, CSVDownload } from "react-csv";
const Export = () => {
    const [form] = Form.useForm();
    const [param, setParam] = useState(false)
    const [snLabels, setSNLabels] = useState([])
    const dispatch = useDispatch()
    const [dataSource, setDataSource] = useState([])
    const activeData = useSelector((state) => state.Exporter.activeData)
    const loading = useSelector((state) => state.Exporter.loading)
    const account = useSelector((state) => state.Account.account)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [csvData, setcsvData] = useState('')
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };


  const defined = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] === undefined) {
          return false;
        }
      }
    }
    return true;
  }
    const submittingForm = (values) => {
        if (defined(values)) {
          const dateRangeFrom = `${values.dateRange[0].$y}-${values.dateRange[0].$M + 1}-${values.dateRange[0].$D}`
          const dateRangeTo = `${values.dateRange[1].$y}-${values.dateRange[1].$M + 1}-${values.dateRange[1].$D}`
          let params = new URLSearchParams(window.location.search);
          params.set('labelId', values.labelId);
          params.set('timestamp', values.dateType);
          params.set('dateFrom', dateRangeFrom);
          params.set('dateTo', dateRangeTo);
          let newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
          history.pushState({}, "", newUrl)
          setParam(!param)
        } 
    }

    useEffect(() => {
        const getLabels = async() => {
          await api.get('api/sn-labels').then((res) => {
            setSNLabels(res.data)
            console.log(res.data)
          })
        }
    
    
          getLabels()
      }, [param])

      useEffect(() => {
        const getFilteredData = async () => {
            const params = new URLSearchParams(window.location.search);
            const {  labelId,timestamp, dateFrom, dateTo } = Object.fromEntries(params.entries());
            const query = `labelId=${labelId}&timestamp=${timestamp}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
            if ( labelId && dateFrom && dateTo) {
              dispatch(getFilterData({query}))
            }
    
        }
        getFilteredData()
      }, [param]) 

      useEffect(() => {
        const data = []
                console.log(activeData, 'activeData')
                for (let i = 0; i < activeData.length; i++) {
                  const docDefectLogger = activeData[i];
                  for (let d = 0; d < docDefectLogger.defectLogs.length; d++) {
                    const log = docDefectLogger.defectLogs[d];
                    const dateObj = new Date(log.uploadedOn)
                    const year = dateObj.getFullYear()
                    const month = dateObj.getMonth() + 1
                    const day = dateObj.getDay()
                    data.push({
                        key: log._id,
                        docNum: log.docNum,
                        serialNumbers: log.sn.join(", "),
                        comment: log.comment,
                        orderCreator: log.orderInformation.creatorName,
                        createdOn: `${month}-${day}-${year}`

                    })
                    
                  }
                  
                }
                setDataSource(data)
      }, [activeData])


      const exportRows = async (idArr) => {
        const token = sessionStorage.getItem("accessToken");
        if(dataSource && idArr.length > 0){
          const rows = dataSource.filter(item => idArr.includes(item.key))
          const keys = Object.keys(rows[0])
          const redifinedData = []
          redifinedData.push(keys)
          for (let i = 0; i < rows.length; i++) {
            const r = rows[i];
            redifinedData.push([r.key, r.docNum, r.serialNumbers, r.comment, r.orderCreator, r.createdOn])
          }
          setcsvData(redifinedData)
          const downloadCSV = document.getElementById('report')
          setTimeout(() => {
            downloadCSV.click()
          }, 1500);
          
        }
        
      }

      const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
          Table.SELECTION_ALL,
          Table.SELECTION_NONE,
          {
            key: 'odd',
            text: 'Select Odd Row',
            onSelect: (changeableRowKeys) => {
              let newSelectedRowKeys = [];
              newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                if (index % 2 !== 0) {
                  return false;
                }
                return true;
              });
              setSelectedRowKeys(newSelectedRowKeys);
            },
          },
          {
            key: 'even',
            text: 'Select Even Row',
            onSelect: (changeableRowKeys) => {
              let newSelectedRowKeys = [];
              newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                if (index % 2 !== 0) {
                  return true;
                }
                return false;
              });
              setSelectedRowKeys(newSelectedRowKeys);
            },
          },
          {
            key: 'export',
            text: 'Export Selected Data',
            onSelect: (changeableRowKeys) => {
              exportRows(selectedRowKeys)
            },
          },
        ],
      };

      const columns = [
        {
          title: 'DOCNUM',
          dataIndex: 'docNum',
        },
        {
          title: 'Defect Serial Numbers',
          dataIndex: 'serialNumbers',
        },
        {
          title: 'Comment',
          dataIndex: 'comment',
        },
        {
          title: 'Order Creator',
          dataIndex: 'orderCreator',
        },
        {
          title: 'Created On',
          dataIndex: 'createdOn',
        },
      ];

    return(
        <div className="flex flex-col pl-20 pr-20 pt-20 pb-4">
        <div className={""}>
          <div className="flex items-end">
            <div className="mr-auto">
              <h1 className="text-3xl font-medium font-genaPrimary">
                Export Data
              </h1>
            </div>
          </div>
          <div className="mb-10 mt-5 border-t border-gray-300 rounded-full" />
          <div className="">
            <Form form={form} className="bg-gray-100 rounded p-3 " name="filterForm" onFinish={submittingForm}>

            <Space>
                <Form.Item name="labelId" className="w-[200px]">
               <Select placeholder="DocNum" >
               <Select.Option  value="*">All</Select.Option>
               {snLabels.length > 0 ? snLabels.map((l) => (
                <Select.Option key={l._id} value={l._id}>{l.docNum}</Select.Option>
               )) : null}
               </Select>
                </Form.Item>
                <Form.Item name="dateType" className="w-[200px]">
               <Select placeholder="Date Type" className="w-[150px]">
               <Select.Option  value="createdOn">Created on</Select.Option>
               <Select.Option  value="updatedOn">Updated on</Select.Option>
               </Select>
                </Form.Item>
                <Form.Item name="dateRange">
               <RangePicker
      format="YYYY-MM-DD"
      />
      </Form.Item>
      <Form.Item>
    <Button className="bg-blue-500 text-white"  htmlType="submit">
        Filter
    </Button>
      </Form.Item>
            </Space>
      </Form>
                
            <Table className="" loading={loading} columns={columns} dataSource={dataSource} rowSelection={rowSelection}/>
            <div>
            <CSVLink id="report" data={csvData} filename={"defect-labels.csv"} hidden>Download Report</CSVLink>
            </div>
          </div>
        </div>
        
      </div>
    )
}


export default Export;