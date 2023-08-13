export const ManagerData = {
    id: 'id1',
    name: 'Project Manager',
    type: 'Manager',
    allocation: 300,
    children: [
        {
            id: 'id2',
            name: 'Dev Manager',
            type: 'Manager',
            allocation: 300,
            children: [
                {
                    id: 'id3',
                    name: 'Developer 1',
                    type: 'Developer',
                    allocation: 1000
                },
                {
                    id: 'id4',
                    name: 'Developer 2',
                    type: 'Developer',
                    allocation: 1000
                }
            ]
        },
        {
            id: 'id5',
            name: 'QA 1',
            type: 'QA Tester',
            allocation: 500
        },
        {
            id: 'id3',
            name: 'Developer 1',
            type: 'Developer',
            allocation: 1000
        }
    ]
};