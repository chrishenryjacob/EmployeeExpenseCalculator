export const EmployeeDependencyData = [
    {
        id: 'employee123',
        refs: ['ref1', 'ref2'],
        children: ['id123', 'child2']
    },
    {
        id: 'employee456',
        refs: ['id123'],
        children: ['child3']
    }
]

export const DepartmentDependencyData = [
    {
        name: 'Development',
        children: ['id123', 'child2', 'child3']
    }
]