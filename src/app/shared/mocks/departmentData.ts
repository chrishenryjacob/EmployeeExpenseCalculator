export const DepartmentData = {
    name: 'Development',
    children: [
        {
            id:'id1',
            name: 'Team Lead',
            type: 'Manager',
            allocation: 300,
            children: [
                {
                    id:'id2',
                    name: 'Developer 1',
                    type: 'Developer',
                    allocation: 1000
                },
                {
                    id:'id3',
                    name: 'Dev OPS 1',
                    type: 'Developer',
                    allocation: 1000
                }
            ]
        },
        {
            id:'id2',
            name: 'Developer 1',
            type: 'Developer',
            allocation: 1000
        }
    ]
};