import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import DashDatePicker from "./filters/DashDatePicker"
import { faFilter } from "@fortawesome/free-solid-svg-icons"
import { Button, Card, Col, Row } from "antd"
import { useState } from "react"
import TopCards from "./top-cards/TopCards"
import Chart from "./analytics/Departments/chart"
import TopLabels from "./analytics/labels/TopLabels"
import TopMaterials from "./analytics/Materials/TopMaterials"

const Main = () => {
    const [showCalendar, setShowCalendar] = useState(false)
    return (
        <div className="flex flex-col pl-20 pr-20 pt-20 pb-4">
        <div className={""}>
        <div className="flex items-end">
          <div className="mr-auto">
            <h1 className="text-3xl font-medium font-genaPrimary flex">Print Shop Analytics</h1>
          </div>
          <div className="">
            <Button className="transform transition-transform duration-300 hover:scale-105" onClick={() => setShowCalendar(!showCalendar)}>
           <FontAwesomeIcon icon={faFilter} />
            </Button>
            <DashDatePicker showCalendar={showCalendar} setShowCalendar={setShowCalendar}/>
          </div>
        </div>
          <div className="mb-10 mt-5 border-t border-gray-300 rounded-full" />
          <TopCards />
          <Row gutter={12} className="mt-6">
            <Col span={8}>
            <TopLabels />
              </Col>
              <Col span={8}>
                <TopMaterials />
              </Col>
            <Col span={8}>
          <Chart />
            </Col>
          </Row>
          </div>
          </div>
    )
}

export default Main