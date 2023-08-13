export const HierarchyData = {
    id: "d872e3ab-8fda-49f7-b04c-31e9b85c8619",
    name: "Manager 1",
    type: "Manager",
    allocation: 300,
    children: [
        {
            id: "233ff3a9-aaaa-4bbf-bdbe-bb1d8eea3b27",
            name: "Dev 1",
            type: "Developer",
            allocation: 1000,
            children: []
        }
    ],
    refs: [
        "04ece3e8-eff0-4a7b-b516-1d99a169ea1b"
    ]
}

export const ExpectedTreeData = {
    "title": "Manager 1",
    "key": "d872e3ab-8fda-49f7-b04c-31e9b85c8619",
    "expanded": true,
    "expense": 300,
    "children": [
        {
            "title": "Dev 1",
            "key": "233ff3a9-aaaa-4bbf-bdbe-bb1d8eea3b27",
            "expanded": true,
            "expense": 1000,
            "children": [],
            "isLeaf": true
        }
    ]
}