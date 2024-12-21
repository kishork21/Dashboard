import React, { useEffect, useMemo, useState } from 'react';
import MockData from '../MockData.json';
import Cards from '../components/DetailCard';
import Header from '../components/Header';
import Utility from '../Utility';
import NoObservation from '../components/No-observation';
import { Stack, Badge, Spinner } from 'react-bootstrap'

const Dashboard = () => {
    const [filters, setFilters] = useState({}); // Default filter state
    const [data, setData] = useState(MockData);
    const [loader, setLoader] = useState(true);
    const [category, setCategory] = useState([]);
    const [scoreRange, setScoreRange] = useState([]);

    const label = {
        filterByCategory: 'Filter By Category',
        filterByEngagementScore: 'Filter By Engagement Score',
        type: 'Type',
        asc: 'Ascending',
        desc: 'Descending',
        sortBy: 'Sort By',
        sortType: 'Sort Type',
        engagementScore: 'Engagement Score',
        'reach': 'Reach'

    }

    useEffect(() => {
        setCategory([...new Set(MockData.map(x => x.category))]);
        const start = 0;
        const end = 700;
        const step = 100;
        const ranges = [];
        for (let i = start; i < end; i += step) {
            const rangeStart = i + 1;
            const rangeEnd = i + step;
            ranges.push(`${rangeStart}-${rangeEnd}`);
        }
        setScoreRange(ranges);
    }, []);

    useEffect(() => {
        console.log('first')
        setLoader(true)
        getFilteredData();
        setLoader(false)
    }, [filters]);


    function getFilteredData() {

        let filteredData = MockData;

        if (filters.filterByCategory && filters.filterByCategory !== '') {
            filteredData = filteredData.filter((item) => item.category === filters.filterByCategory);
        }

        if (filters.filterByEngagementScore && filters.filterByEngagementScore !== '') {
            let d = filters.filterByEngagementScore.split('-');
            const start = parseInt(d[0]);
            const end = parseInt(d[1]);
            filteredData = filteredData.filter(item => (item.engagementScore >= start && item.engagementScore <= end));
        }

        if (filters.sortType && filters.sortType !== '' || filters.sortBy && filters.sortBy !== '') {
            filteredData = Utility.sort(filters.sortType, filteredData, filters.sortBy)
        }
        console.log('Filtered Data:', filteredData);
        setData(filteredData);
    }

    function setValues(key, value) {
        setFilters(prev => {
            return {
                ...prev, [key]: value
            }
        })
    }

    const CardUi = useMemo(() => data.map((item, index) => <Cards data={item} key={index} />), [data]);

    return (
        <>
            <Header filters={(filter) => setFilters(filter)} />
            {
                loader === false &&
                <>

                    <div className="filter-area">
                        <div className="container-area">
                            <label htmlFor="category">Filter By:</label>
                            <div class="container">
                                <div class="filter-section">
                                    <label className='text-muted' htmlFor="">Category:</label>
                                    <select id="category" onChange={(e) => setValues('filterByCategory', e.target.value)}>
                                        <option selected disabled>Select Category</option>
                                        {category.map(x => <option value={x}>{x}</option>)}
                                    </select>
                                    &nbsp;&nbsp;
                                    <label className='text-muted' htmlFor="score">Engagement Score:</label>
                                    <select id="category" onChange={(e) => setValues('filterByEngagementScore', e.target.value)}>
                                        <option selected disabled>Select Score</option>

                                        {scoreRange.map(x => <option value={x}>{x}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="container-area sortinf-section">
                            <label htmlFor="sort">Sort By:</label>
                            <div class="container">

                                <div class="sort-section">
                                    <div class="radio-group">
                                        <input type="radio" id="reach" name="sort" value="reach" onChange={(e) => setValues('sortBy', 'reach')} />
                                        <label className='text-muted' htmlFor="reach">Reach</label>
                                        <input type="radio" id="name" name="sort" value="name" onChange={(e) => setValues('sortBy', 'engagementScore')} />
                                        <label className='text-muted' htmlFor="name">Engagement Score</label>
                                    </div>
                                </div>
                                &nbsp;
                                <select onChange={(e) => setValues('sortType', e.target.value)}>
                                    <option selected disabled>Sort by</option>
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <hr />
                    <div className="filter-container">
                        <Stack direction='horizontal' gap={'10px'}>
                            {
                                Object.keys(filters).map(key =>
                                    <Badge pill className='mx-1'>
                                        <span className='text-muted'>{label[key]}:</span> {label[filters[key]] ? label[filters[key]] : filters[key]}
                                    </Badge>
                                )
                            }
                        </Stack>
                    </div>
                    {
                        data && data.length > 0 &&
                        <div className="card-container">
                            {
                                CardUi
                            }
                        </div>
                    }

                    {
                        !data || data.length === 0 && <NoObservation />
                    }
                </>}

            {
                loader === true &&
                <Spinner className='mt-5' animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            }
        </>
    );
};

export default Dashboard;
