import Layout from "~/components/Layout";
const Resources = () => {
    return(
        <Layout>
             <div className={"flex flex-col pl-20 pr-20 pt-20 pb-4"}>
      <div className="flex justify-between">
        <h1 className="text-3xl font-medium font-genaPrimary">
            Resources
          </h1>
          </div>
          <div className="mb-10 mt-5 border-t border-gray-300 rounded-full" />
           <div
                className={`grid px-5 grid-cols-3 justify-items-center font-medium text-lg h-14 bg-white items-center transition-all ease-in-out duration-500 mx-10 mt-10 `}
                >
                <h4>How To</h4>
                <h4>Video Link</h4>
                <h4>Procedure Link</h4>
              </div>

              <div className="grid px-5 grid-cols-3 justify-items-center font-small h-10 border-t-2 bg-white items-center t duration-500 mx-10  hover:bg-gray-100 transition-all ease-in-out cursor-pointer">
                <p>Place an Order</p>
                <a target="_blank" href="http://internalweb/wp-content/uploads/IG-Gena-Ordering-Procedure-DOC1588.pdf">Click Here</a>
                <p></p>
              </div>
              <div className="grid px-5 grid-cols-3 justify-items-center font-small h-10 border-t-2 bg-white items-center  duration-500 mx-10  hover:bg-gray-100 transition-all ease-in-out cursor-pointer">
                <p>Submit a Ticket</p>
                <p>Click Here</p>
                <p></p>
              </div>

              {/* <div className="grid px-5 grid-cols-3 justify-items-center font-small h-10 border-t-2 bg-white items-center  duration-500 mx-10  hover:bg-gray-100 transition-all ease-in-out cursor-pointer">
                <p>Insert or Update a Label</p>
                <p>Click Here</p>
                <p></p>
              </div> */}
       
        </div>
        <div>
        </div>
                  </Layout>
    )
}

export default Resources