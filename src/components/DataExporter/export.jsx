import { Button, Select, Space, Table, DatePicker, Form } from "antd";
import { useEffect, useState } from "react";
import { api } from "../../../axiosService";
import { useDispatch } from "react-redux";
const { RangePicker } = DatePicker;
const Export = () => {
    const [form] = Form.useForm();
    const [param, setParam] = useState(false)
    const [snLabels, setSNLabels] = useState([])
    const dispatch = useDispatch()
    const submittingForm = (values) => {
        const dateRangeFrom = `${values.dateRange[0].$y}-${values.dateRange[0].$M + 1}-${values.dateRange[0].$D}`
        const dateRangeTo = `${values.dateRange[1].$y}-${values.dateRange[1].$M + 1}-${values.dateRange[1].$D}`
        let params = new URLSearchParams(window.location.search);
        params.set('dataType', values.dataType);
        params.set('docNum', values.docNum);
        params.set('dateFrom', dateRangeFrom);
        params.set('dateTo', dateRangeTo);
        let newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
        history.pushState({}, "", newUrl)
        setParam(!param)
    }

    useEffect(() => {
        const getLabels = async() => {
          await api.get('api/sn-labels').then((res) => {
            setSNLabels(res.data)
            console.log(res.data)
          })
        }
    
    
          getLabels()
      }, [])

      useEffect(() => {
        const getFilteredData = async () => {
            const params = new URLSearchParams(window.location.search);
            const { dataType, docNum, dateFrom, dateTo } = Object.fromEntries(params.entries());
            const query = `dataType=${dataType}&docNum=${docNum}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
            // dispatch(getFilteredData({query}))
            console.log("working")
        }
        getFilteredData()
      }), [param]

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
                <Form.Item name="dataType" className="w-[200px]">
               <Select placeholder="Data Type" >
               <Select.Option  value="label-defects">Label Defects</Select.Option>
               </Select>
                </Form.Item>
                <Form.Item name="docNum" className="w-[200px]">
               <Select placeholder="DocNum" >
               <Select.Option  value="*">All</Select.Option>
               {snLabels.length > 0 ? snLabels.map((l) => (
                <Select.Option  value="docNum">DOC01234</Select.Option>
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
                
            <Table className="" loading={true}/>
          </div>
        </div>
        
      </div>
    )
}


export default Export;