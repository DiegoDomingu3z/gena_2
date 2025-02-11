import Layout from "~/components/layouts/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faFilePdf } from "@fortawesome/free-solid-svg-icons";
const Resources = () => {
  return (
    <Layout displayTitle={'Resources'} title={"Gena | Resources"}>
      <div className={"flex flex-col pl-20 pr-20 pt-20 pb-4"}>
        <h1 className="text-2xl font-semibold">How Do I...</h1>
        <div
          className={`grid grid-cols-3 font-medium text-lg h-14 items-center transition-all ease-in-out duration-100 mt-10`}
        >
          <div className="w-[300px]">
            <h2 className="bg-[#233042] text-white px-5 h-10 flex items-center">
              <span>Place an order?</span>
            </h2>
            <div className="border border-[#233042] p-5 shadow-[5px_5px_#233042] leading-[3rem]">
              <div>
                <a
                  className="w-full hover:border-[#233042] hover:border-dotted border-b-2 border-transparent"
                  target="_blank"
                  href="https://youtu.be/dx1uvHVyEpg"
                >
                  <span className="w-[20px] mr-[20px]">
                    <FontAwesomeIcon icon={faPlay} />
                  </span>
                  Watch The Video
                </a>
              </div>
              <div>
                <a
                  className="w-full hover:border-[#233042] hover:border-dotted border-b-2 border-transparent"
                  target="_blank"
                  href="http://internalweb/wp-content/uploads/IG-Gena-Ordering-Procedure-DOC1588.pdf"
                >
                  <span className="w-[20px] mr-[20px]">
                    <FontAwesomeIcon icon={faFilePdf} />
                  </span>
                  Read The Documentation
                </a>
              </div>
            </div>
          </div>
          <div className="w-[300px]">
            <h2 className="bg-[#233042] text-white px-5 h-10 flex items-center">
              <span>Learn Server Information</span>
            </h2>
            <div className="border border-[#233042] p-5 shadow-[5px_5px_#233042] leading-[3rem]">
              <div>
                <a
                  className="w-full hover:border-[#233042] hover:border-dotted border-b-2 border-transparent"
                  target="_blank"
                >
                  <span className="w-[20px] mr-[20px]">
                    <FontAwesomeIcon icon={faPlay} />
                  </span>
                  Video Coming Soon
                </a>
              </div>
              <div>
                <a
                  className="w-full hover:border-[#233042] hover:border-dotted border-b-2 border-transparent"
                  target="_blank"
                  href="http://192.168.55.26:3006/"
                >
                  <span className="w-[20px] mr-[20px]">
                    <FontAwesomeIcon icon={faFilePdf} />
                  </span>
                  Read The Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </Layout>
  );
};

export default Resources;
