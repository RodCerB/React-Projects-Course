import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

// Primeiro criamos nosso context seguindo a forma:
const GithubContext = React.createContext()

const GithubProvider = ({children}) => {
    const [githubUser, setGithubUser] = useState(mockUser)
    const [repos, setRepos] = useState(mockRepos)
    const [followers, setFollowers] = useState(mockFollowers)
    // request loading
    const [requests, setRequests] = useState(0)
    const [loading, setLoading] = useState(false)
    // error
    const [error, setError] = useState({show:false, msg:''})

    const searchGithubUser = async(user)=>{
        toggleError()
        // setLoading(true)
        const response = await axios(`${rootUrl}/users/${user}`)
        .catch((err)=>console.log(err))
        if(response){
            setGithubUser(response.data)
            // more logic here
        }
        else{
            toggleError(true, 'the is no user with that username')
        }
    }
    
    // check rate
    const checkRequest = () =>{
        axios(`${rootUrl}/rate_limit`)
        .then(({data})=>{
            let {rate: {remaining}} = data
            setRequests(remaining)
            if(remaining === 0){
                // throw an error
                toggleError(true,'sorry, you have exceeded your hourly rate limit!')
            }
        })
        .catch((err)=>console.log(err))
    }
    //  check error
    function toggleError(show = false, msg = ''){
        setError({show,msg})
    }

    useEffect(
        checkRequest, []
    )
    

    return (
    <GithubContext.Provider value={{githubUser, repos, followers, requests, error, searchGithubUser}}>{children}</GithubContext.Provider>)
}

export {GithubProvider, GithubContext}