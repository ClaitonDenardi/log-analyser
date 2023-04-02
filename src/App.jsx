import { Input, Select, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  async function loadFile(file) {
    await file.text()
      .then((data) => {
        let arr = data.split("\n");
        setFile(arr);
      })
      .catch((err) => console.error("Erro ao abrir arquivo", err))
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
        agent: arr[8],
        url: arr[9],
        status: arr[10],
      }
      dataArr.push(obj);

    });

    setData(dataArr);
  }, [file]);

  return (
    <div className="App">
      <input type="file" onChange={(e) => loadFile(e.target.files[0])} />
      <br />
      {data &&
        <div>
          <Text>Date</Text>
          <Input placeholder='12-12-2012' />
          <Text>Time</Text>
          <Input placeholder='16:20' />
          <Text>Type</Text>
          <Input placeholder='GET' />
          <Text>File</Text>
          <Input placeholder='home.asp' />
          <Text>Status code</Text>
          <Select placeholder='Select a status'>
            <option value='500'>500</option>
            <option value='302'>302</option>
            <option value='200'>200</option>
          </Select>
          <table>
            <thead>
              <th>Date</th>
              <th>Time</th>
              <th>Type</th>
              <th>File/page</th>
              <th>User agent</th>
              <th>Status code</th>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.type}</td>
                  <td>{item.file}</td>
                  <td>{item.agent}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  )
}

export default App
