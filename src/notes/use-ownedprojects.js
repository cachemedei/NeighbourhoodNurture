import { useState, useEffect } from 'react';

//import getProjects from '../api/get-projects';
import useProjects from '../hooks/use-projects';

export default function useOwnedProjects(userId) {
    const { projects } = useProjects();
    const [usersProjects, setUsersProjects] = useState([])

    useEffect(() => {
        let list = [];
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].owner == userId) {
                list.push(projects[i]);
            }
        }
        console.log(list);
        setUsersProjects(list)
    }, [projects]);

    return { usersProjects };
}

// useEffect(() => {
//     getProjects()
//         .then((projects) => {
//             setAllProjects(projects);
//             console.log(allProjects);

//             let usersProjects = [];
//             for (let i = 0; i < allProjects.length; i++) {
//                 if (allProjects[i].owner == userId) {
//                     usersProjects.push(allProjects[i]);
//                 }
//             }
//             console.log(usersProjects);
//             setOwnedProjects(usersProjects);
//             console.log(ownedProjects);
//         })

//         .catch((error) => {
//             setError(error);
//         });
// }, [userId]);

// return { allProjects, ownedProjects, error };
