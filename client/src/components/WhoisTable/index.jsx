const truncateString = (str, maxLength = 25) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
};

export default function WhoisTable({ data }) {
  console.log("data", data);
  return (
    <>
      {data.requestedData == "contact" ? (
        <table class="table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Registrant Name
              </th>
              <th scope="col" class="px-6 py-3">
                Technical Contact Name
              </th>
              <th scope="col" class="px-6 py-3">
                Administrative Contact Name
              </th>
              <th scope="col" class="px-6 py-3">
                Contact Email
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {data.registrant}
              </th>
              <td class="px-6 py-4">{data.technicalContact}</td>
              <td class="px-6 py-4">{data.administrativeContact}</td>
              <td class="px-6 py-4">{data.contactEmail}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <table class="table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Domain Name
              </th>
              <th scope="col" class="px-6 py-3">
                Registrar
              </th>
              <th scope="col" class="px-6 py-3">
                Registration Date
              </th>
              <th scope="col" class="px-6 py-3">
                Expiration Date
              </th>
              <th scope="col" class="px-6 py-3">
                Estimated Domain Age
              </th>
              <th scope="col" class="px-6 py-3">
                Hostnames
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {data.domainName}
              </td>
              <td class="px-6 py-4">{data.registrarName}</td>
              <td class="px-6 py-4">{data.createdDate}</td>
              <td class="px-6 py-4">{data.expiresDate}</td>
              <td class="px-6 py-4">{data.estimatedDomainAge}</td>
              <td class="px-6 py-4">
                {truncateString(data.hostNames.join(", "))}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
}
