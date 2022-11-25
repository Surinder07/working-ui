import styles from "../styles/pages/Dashboard.module.css";
import Image from "next/image";
import Pagination from "../components/Pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Invoices = (props) => {
  return (
    <div className={`flex flex-col w-full m-2 p-2 border-2 border-solid rounded-lg border-[#E2E3ED]`}>
      <div className="flex items-baseline">
        {/* <div className="flex hover:cursor-pointer">
          <div className={`${styles.symbol} font-black text-xl`}> ⋮ </div>
          <div className={`${styles.symbol} font-black text-xl`}> ⋮ </div>
        </div> */}
        <div className="flex w-full justify-between">
          <div className="flex flex-col items-baseline">
            <h3 className={`${styles.invoiceHeading} ml-4`}>{props.heading}</h3>
            <h4 className={styles.subHeading}>{props.subHeading}</h4>
          </div>
          <div className="flex items-baseline">
            {props.sort === "true" && (
              <div className="flex mx-6 mt-1 hover:cursor-pointer">
                <Image src={props.sortUrl} width="13" height="13" />
                <p className={`${styles.tag} ml-3`}>Sort</p>
              </div>
            )}
            {props.filter === "true" && (
              <div className="flex mx-6 mt-1 hover:cursor-pointer">
                <Image src={props.filterUrl} width="13" height="13" />
                <p className={`${styles.tag} ml-3`}>Filter</p>
              </div>
            )}
            <div className={`${styles.symbol} font-black text-xl hover:cursor-pointer`}> ⋮ </div>
          </div>
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 ">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-[#D9D9D9]">
                    <tr>
                      {props.invoiceHeader.map((heading) => (
                        <th
                          scope="col"
                          className={`px-3 py-3.5 text-left text-sm font-bold tracking-wide text-[#535255] ${
                            heading.name === "Number of active employees" || heading.name === "Number of inactive employees" ? "text-center" : ""
                          }`}
                        >
                          {heading.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {props.invoiceData.map((value) => (
                      <tr key={value.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-[#535255] font-medium tracking-wide">{value.invoicesId}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-[#535255] font-medium tracking-wide">{value.service}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-[#535255] font-medium tracking-wide">{value.startDate}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-[#535255] font-medium tracking-wide">{value.endDate}</td>
                        <td className={`whitespace-nowrap px-3 py-4 text-sm text-[#535255] font-medium tracking-wide ${props.center === "true" ? "text-center" : ""}`}>{value.billingDate}</td>
                        <td className={`whitespace-nowrap px-3 py-4 text-sm text-[#535255] font-medium tracking-wide ${props.center === "true" ? "text-center" : ""}`}>{value.amount}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-[#535255] font-medium tracking-wide">
                          {props.button ? (
                            <button
                              type="button"
                              className={`inline-flex items-center px-6 py-1 border border-transparent text-xs font-medium rounded-full shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                                value.status === "PAID" ? "bg-green-400" : "bg-yellow-500"
                              }`}
                            >
                              {value.status}
                            </button>
                          ) : (
                            <p>{value.status}</p>
                          )}
                        </td>
                        <td className={`whitespace-nowrap px-3 py-4 text-sm text-[#535255] font-medium tracking-wide ${props.center === "true" ? "text-center" : ""}`}>
                          <div className={`${styles.symbol} font-black text-xl hover:cursor-pointer`}> … </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination />
    </div>
  );
};

export default Invoices;
