export const ManagerData = {
    name: 'Project Manager',
    type: 'Manager',
    allocation: 300,
    children: [
        {
            name: 'Dev Manager',
            type: 'Manager',
            allocation: 300,
            children: [
                {
                    name: 'Developer 1',
                    type: 'Developer',
                    allocation: 1000
                },
                {
                    name: 'Developer 2',
                    type: 'Developer',
                    allocation: 1000
                }
            ]
        },
        {
            name: 'QA 1',
            type: 'QA Tester',
            allocation: 500
        }
    ]
};