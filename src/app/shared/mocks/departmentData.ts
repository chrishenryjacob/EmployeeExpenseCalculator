export const DepartmentData = {
    name: 'Development',
    children: [
        {
            name: 'Team Lead',
            type: 'Manager',
            allocation: 300,
            subordinates: [
                {
                    name: 'Developer 1',
                    type: 'Developer',
                    allocation: 1000
                },
                {
                    name: 'Dev OPS 1',
                    type: 'Developer',
                    allocation: 1000
                }
            ]
        }
    ]
};