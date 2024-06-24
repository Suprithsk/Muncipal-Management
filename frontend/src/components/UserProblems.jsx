import AdminHeader from "./AdminHeader"
import { Select } from "@chakra-ui/react"
import './AdminProblems.css'
import { Input } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { Button } from "@chakra-ui/react"
import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import ProblemCard from "./ProblemCard"
import { useState } from "react"
import { useEffect } from "react"


import { getAllProblems } from "../apis/adminApis"
import { getAllCities, getAreas } from "../apis/adminApis"

function UserProblems() {
    const [problems, setProblems] = useState([])
    const [searchFilterProblems, setSearchFilterProblems] = useState([])
    const [searchCityId, setSearchCityId] = useState('')
    const [searchAreaId, setSearchAreaId] = useState('')
    const [searchRadioValue, setSearchRadioValue] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')
    const [cities, setCities] = useState([])
    const [areas, setAreas] = useState([])
    useEffect(() => {
        getAllProblems().then(data => {
            setProblems(data)
            setSearchFilterProblems(data)
            console.log(data)
        })
        getAllCities().then(data => {
            setCities(data)
        })
    }, [])
    const getAreasByCity = (city_id) => {
        if(!city_id) {
            setAreas([])
            return
        }
        getAreas(city_id).then(data => {
            setAreas(data)
        })
    }
    const refreshPage = () => {
        getAllProblems().then(data => {
            setProblems(data)
            const searchFilterProblemsIds=searchFilterProblems.map(problem=>problem._id)
            setSearchFilterProblems(data.filter(problem=>searchFilterProblemsIds.includes(problem._id)))
        })
    }
    const reset=()=>{
        setSearchFilterProblems(problems)
        setSearchCityId('')
        setSearchAreaId('')
        setSearchTerm('')
        setSearchRadioValue('all')
        setAreas([])
    }
    const checkAreaId=(area_id)=>{
        if(area_id==='NA' || area_id===''){
            return false
        }
        return true
    }
    const checkRadioValue=(radioValue,value)=>{
        if(radioValue==='resolved'&& value===true){
            return true
        }else if(radioValue==='unresolved'&& value===false){
            return true
        }
        return false
    }
    const filterMethod = (city_id='',area_id='',searchValue='',radioValue='') => {
        console.log(city_id,area_id)
        radioValue=radioValue!==''?radioValue:searchRadioValue
        city_id=city_id!==''?city_id:searchCityId
        area_id=area_id!==''?area_id:searchAreaId
        searchValue=searchValue!==''?searchValue:searchTerm
        console.log(area_id,searchValue)
        const newProblems = problems.filter(problem => {
            return (city_id!==''?problem.city_id._id===city_id:true) &&
            (checkAreaId(area_id)?problem.area_id._id === area_id:true) &&
            (searchValue!==''?problem.title.toLowerCase().includes(searchValue.toLowerCase()):true)&&
            (radioValue!=='all'?checkRadioValue(radioValue,problem.is_resolved):true)
        })
        setSearchFilterProblems(newProblems)
    }
    const searchWithCityFilter = (city_id) => {
        if(!city_id){
            return
        }
        filterMethod(city_id,'NA')
    }
    const searchWithAreaFilter = (area_id) => {
        if(searchCityId!=='' && !area_id){
            searchWithCityFilter(searchCityId) 
            return
        }
        filterMethod('',area_id)
    }
    const searchWithSearchTerm = () => {
        console.log(searchTerm)
        if(searchTerm===''){
            return
        }
        console.log('searching with search term')
        filterMethod('','',searchTerm,'')
    }
    // const searchWithRadioValue = (radioValue) => {
    //     filterMethod('','','',radioValue)
    // }
    const onChangeHandler = (e) => {
        setSearchRadioValue(e)
        filterMethod('','','',e)
    }
    return (
        <div>
            <AdminHeader />
            <div className="problems-div">
                <div className="problems-div__top">
                    <div className="problem-div__search">
                        <Select placeholder='Filter by city' onChange={(e)=>{
                            getAreasByCity(e.target.value)
                            setSearchCityId(e.target.value)
                            searchWithCityFilter(e.target.value)
                        }} value={searchCityId}>
                            {cities.map(city => {
                                return <option key={city._id} value={city._id}>{city.name}</option>
                            })}
                        </Select>
                    </div>
                    <div className="problem-div__search">
                        <Select placeholder={areas.length==0?`Select a city first`:`Select an area`} 
                            onChange={(e)=>{
                                console.log('called from on change func',e.target.value)
                                setSearchAreaId(e.target.value)
                                searchWithAreaFilter(e.target.value)
                            }}
                            value={searchAreaId}
                        >
                            {areas.map(area => {
                                return <option key={area._id} value={area._id}>{area.name}</option>
                            })}
                        </Select>
                    </div>
                </div>
                <div className="problem-div__second">
                    <div className="problem-div__actualSearch">
                        <Input placeholder='Search...' onChange={(e)=>{
                            setSearchTerm(e.target.value)
                        }}
                        value={searchTerm}
                        />
                        <IconButton aria-label='Search database' icon={<SearchIcon />} onClick={searchWithSearchTerm}/>
                        <Button bg="black" color="white" _hover={{ bg: "gray.700" }} onClick={reset}>Reset</Button>
                    </div>
                </div>
                <RadioGroup className="problem-div__third" value={searchRadioValue} onChange={onChangeHandler}>
                    <Stack direction='row' >
                        <Radio value='all' >All</Radio>
                        <Radio value='resolved'>Resolved</Radio>
                        <Radio value='unresolved'>Unresolved</Radio>
                    </Stack>
                </RadioGroup>
            </div>
            <div className="problems-cards">
                {searchFilterProblems.map(problem => {
                    return <ProblemCard refreshPage={refreshPage} key={problem._id} problem_id={problem._id} description={problem.description}  title={problem.title} area={problem.area_id} city={problem.city_id} user={problem.user_id} problem_resolved={problem.is_resolved} />
                })}
            </div>
        </div>
    )
}

export default UserProblems