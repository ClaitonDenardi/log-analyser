import { Button, Input, Select, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadFile(file) {
    await file.text()
      .then((data) => {
        setLoading(true);
        let arr = data.split("\n");
        setFile(arr);
      })
      .catch((err) => {
        console.error("Erro ao abrir arquivo", err);
        setLoading(false);
      })
  }

  useEffect(() => {
    if (!file) return;
    let dataArr = [];

    file.forEach(element => {
      let arr = element.split(" ");
      if (arr[0].includes("#")) return;

      let date = arr[0].split('-').reverse().join('/');
      let obj = {
        date: date,
        time: arr[1],
        type: arr[3],
        file: arr[4],
        error: arr[5],
        agent: arr[8],
        url: arr[9],
        status: arr[10],
      }
      dataArr.push(obj);

    });

    setData(dataArr);
    setLoading(false);
  }, [file]);

  return (
    <div className="App">
      {/* <label for="file">{file ? "Change log file" : "Select a log file (.txt)"}</label> */}
      <input type="file" name="file" id="file" onChange={(e) => loadFile(e.target.files[0])}></input>
      <br />
      {loading &&
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      }
      {!loading && data &&
        <div>
          <TableContainer>
            <Table variant='striped' colorScheme='blue'>
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Time</Th>
                  <Th>Type</Th>
                  <Th>File/page</Th>
                  <Th>Status code</Th>
                </Tr>
                <Tr>
                  <Th><Input variant='outline' focusBorderColor='pink.400' htmlSize={7} placeholder='12/12/2012' /></Th>
                  <Th><Input htmlSize={5} placeholder='16:20:00' /></Th>
                  <Th>
                    <Select placeholder='Select option'>
                      <option value='GET'>GET</option>
                      <option value='POST'>POST</option>
                      <option value='PUT'>PUT</option>
                    </Select>
                  </Th>
                  <Th><Input htmlSize={7} placeholder='home.asp' /></Th>
                  <Th>
                    <Select placeholder='Select option'>
                      <option value='500'>500</option>
                      <option value='302'>302</option>
                      <option value='200'>200</option>
                    </Select>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item) => (
                  <Tr>
                    <Td>{item.date}</Td>
                    <Td>{item.time}</Td>
                    <Td>{item.type}</Td>
                    <Td>{item.file}</Td>
                    <Td>{item.status}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      }
    </div>
  )
}

export default App
