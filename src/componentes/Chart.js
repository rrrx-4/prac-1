import React, { useEffect, useState } from 'react'
import Wrapper from '../asset/wrappers/Chart'
import axios from 'axios';
import { LineChart, Line, CartesianGrid, Label, XAxis, YAxis, Tooltip } from 'recharts';
import Select from './Select';
const moment = require('moment'); // Import Moment.js

const yearOption = [
    { label: '2022', value: 2022 },
    { label: '2023', value: 2023 },
    { label: '2024', value: 2024 },
]

const monthsOption = [
    { label: 'Jan', value: 0 },
    { label: 'Feb', value: 1 },
    { label: 'Mar', value: 2 },
    { label: 'Apr', value: 3 },
    { label: 'May', value: 4 },
    { label: 'Jun', value: 5 },
    { label: 'Jul', value: 6 },
    { label: 'Aug', value: 7 },
    { label: 'Sept', value: 8 },
    { label: 'Oct', value: 9 },
    { label: 'Nov', value: 10 },
    { label: 'Dec', value: 11 },
]




function Chart() {

    const [allData, setAllData] = useState([])
    const [chartData, setChartData] = useState([]);
    const [year, setYear] = useState(2023);
    const [month, setMonth] = useState(7);

    const timestamp = 1656201600; // Replace with your timestamp
    const humanReadableDate = moment.unix(timestamp).format('MMM-DD HH:mm');

    // console.log(humanReadableDate);

    const data = [{ date: '5 mar 2023', value: 434335 }, { date: '17 mar 2020', value: 434335 }, { date: '4 mar 2021', value: 434335 }, { date: '13 mar 2053', value: 434335 }]

    const helper = (rd) => {

        const data = rd.map((arr) => {
            // console.log("data", arr);
            const timestamp = arr[0];
            const value = arr[1];

            const date = moment.unix(timestamp).format('MMM-DD-YYYY HH:mm');

            // console.log(typeof moment(date));

            const obj = {
                ogDate: moment(date),
                date: date,
                value: value
            }

            return obj;



        })

        // console.log("data", data);

        // setChartData(data);
        setAllData(data)

    }



    async function getUser() {
        try {
            const response = await axios.get('https://api.llama.fi/summary/fees/lyra?dataType=dailyFees');
            // console.log("response", response.data.totalDataChart);

            const rawData = await response.data;

            // console.log(rawData.totalDataChart);

            helper(rawData.totalDataChart);

        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {

        getUser()
        // changeData()

    }, [])

    const handleChangeYear = (e) => {

        // console.log(e.target.value);
        setYear(e.target.value)



    }

    const handleChangeMonth = (e) => {

        // console.log(e.target.value);
        setMonth(e.target.value)

    }

    const changeData = () => {

        const filterYear = allData.filter((item) => {


            if (parseInt(item.ogDate.year()) === parseInt(year)) {


                return item

            }

        })


        const filterMonth = filterYear.filter((item) => {
            return (
                item.ogDate.month() === parseInt(month)
            )
        })
        // console.log("fff", filterMonth);
        setChartData(filterMonth)



    }

    useEffect(() => {

        changeData();


    }, [year, month, allData])



    return (
        <Wrapper>
            <div className='select-container'>
                <Select className='year-select' label="Year" onChange={handleChangeYear} options={yearOption} value={year}  ></Select>
                <Select className='month-select' label="Month" onChange={handleChangeMonth} options={monthsOption} value={month}  ></Select></div>
            <main>
                {

                    chartData.length > 0 ? (
                        <LineChart width={600} height={400} data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>

                            <CartesianGrid stroke="#000" fill='black' strokeDasharray="5 5" />
                            <Line type="monotone" dataKey="value" stroke="turquoise" activeDot={{ r: 7 }} />
                            <Tooltip></Tooltip>
                            <XAxis dataKey="date" interval={2} tick={<CustomizedAxisTick />}>
                                {/* <Label value="Time" position="insideBottom" /> */}
                            </XAxis>
                            <YAxis >
                                {/* <Label value="Value" /> */}
                            </YAxis>
                        </LineChart>
                    ) : <h1>No Data</h1>
                }
            </main>


        </Wrapper>
    )
}


const CustomizedAxisTick = (e) => {

    const { x, y, value, payload } = e

    // console.log("fffffff", x, y, payload);

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={10} y={0} dy={12} textAnchor="end" fill="#666" transform="rotate(65)" >{payload.value.slice(0, 6)}</text>
        </g>
    )
}

export default Chart