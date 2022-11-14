import { employeeDataType } from "../types/employeeDataType";
import { employeePositionsData } from "./employeePositionsData";

export const employeeresExampleData: employeeDataType[] = [
    {
        employeeId: 1,
        employeeName: 'Adam Kowalski',
        employeePosition: `${employeePositionsData[0].employeePositionName}`,
        employeeStatus: true,
        employeeCode: 4328,
        additionalInformation: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat, aspernatur vel, molestiae ad iste id doloremque quod delectus officiis iusto soluta, exercitationem facere deserunt eos sed ipsum blanditiis nesciunt dolore animi commodi explicabo aut? Ab eligendi ratione voluptatem vitae inventore nobis quis omnis animi aspernatur nisi, consequuntur, nemo tempora laboriosam, perferendis nesciunt et iusto ea debitis cupiditate quam quibusdam.',
        dateAdded: new Date(2022, 9, 1, 12, 45, 0).toJSON(),
        modificationDate: null
    },
    {
        employeeId: 2,
        employeeName: 'Jan Nowak',
        employeePosition: `${employeePositionsData[4].employeePositionName}`,
        employeeStatus: true,
        employeeCode: 8863,
        additionalInformation: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat, aspernatur vel, molestiae ad iste id doloremque quod delectus officiis iusto soluta, exercitationem facere deserunt eos sed ipsum blanditiis nesciunt dolore animi commodi explicabo aut? Ab eligendi ratione voluptatem vitae inventore nobis quis omnis animi aspernatur nisi, consequuntur, nemo tempora laboriosam, perferendis nesciunt et iusto ea debitis cupiditate quam quibusdam.',
        dateAdded: new Date(2022, 9, 1, 12, 45, 0).toJSON(),
        modificationDate: new Date().toJSON()
    },
    {
        employeeId: 3,
        employeeName: 'Anna Kowalska',
        employeePosition: `${employeePositionsData[1].employeePositionName}`,
        employeeStatus: true,
        employeeCode: 9012,
        additionalInformation: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat, aspernatur vel, molestiae ad iste id doloremque quod delectus officiis iusto soluta, exercitationem facere deserunt eos sed ipsum blanditiis nesciunt dolore animi commodi explicabo aut? Ab eligendi ratione voluptatem vitae inventore nobis quis omnis animi aspernatur nisi, consequuntur, nemo tempora laboriosam, perferendis nesciunt et iusto ea debitis cupiditate quam quibusdam.',
        dateAdded: new Date(2022, 9, 1, 12, 45, 0).toJSON(),
        modificationDate: new Date().toJSON()
    },
    {
        employeeId: 4,
        employeeName: 'Jan Kowalski',
        employeePosition: `${employeePositionsData[3].employeePositionName}`,
        employeeStatus: false,
        employeeCode: 3209,
        additionalInformation: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat, aspernatur vel, molestiae ad iste id doloremque quod delectus officiis iusto soluta, exercitationem facere deserunt eos sed ipsum blanditiis nesciunt dolore animi commodi explicabo aut? Ab eligendi ratione voluptatem vitae inventore nobis quis omnis animi aspernatur nisi, consequuntur, nemo tempora laboriosam, perferendis nesciunt et iusto ea debitis cupiditate quam quibusdam.',
        dateAdded: new Date(2022, 9, 1, 12, 45, 0).toJSON(),
        modificationDate: null
    },
    {
        employeeId: 5,
        employeeName: 'Adam Nowak',
        employeePosition: `${employeePositionsData[2].employeePositionName}`,
        employeeStatus: true,
        employeeCode: 1142,
        additionalInformation: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat, aspernatur vel, molestiae ad iste id doloremque quod delectus officiis iusto soluta, exercitationem facere deserunt eos sed ipsum blanditiis nesciunt dolore animi commodi explicabo aut? Ab eligendi ratione voluptatem vitae inventore nobis quis omnis animi aspernatur nisi, consequuntur, nemo tempora laboriosam, perferendis nesciunt et iusto ea debitis cupiditate quam quibusdam.',
        dateAdded: new Date(2022, 9, 1, 12, 45, 0).toJSON(),
        modificationDate: new Date().toJSON()
    },
    {
        employeeId: 6,
        employeeName: 'Jan Wiśniewski',
        employeePosition: `${employeePositionsData[5].employeePositionName}`,
        employeeStatus: true,
        employeeCode: 8472,
        additionalInformation: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat, aspernatur vel, molestiae ad iste id doloremque quod delectus officiis iusto soluta, exercitationem facere deserunt eos sed ipsum blanditiis nesciunt dolore animi commodi explicabo aut? Ab eligendi ratione voluptatem vitae inventore nobis quis omnis animi aspernatur nisi, consequuntur, nemo tempora laboriosam, perferendis nesciunt et iusto ea debitis cupiditate quam quibusdam.',
        dateAdded: new Date(2022, 9, 1, 12, 45, 0).toJSON(),
        modificationDate: null
    },
    {
        employeeId: 7,
        employeeName: 'Anna Wiśniewska',
        employeePosition: `${employeePositionsData[7].employeePositionName}`,
        employeeStatus: false,
        employeeCode: 3472,
        additionalInformation: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat, aspernatur vel, molestiae ad iste id doloremque quod delectus officiis iusto soluta, exercitationem facere deserunt eos sed ipsum blanditiis nesciunt dolore animi commodi explicabo aut? Ab eligendi ratione voluptatem vitae inventore nobis quis omnis animi aspernatur nisi, consequuntur, nemo tempora laboriosam, perferendis nesciunt et iusto ea debitis cupiditate quam quibusdam.',
        dateAdded: new Date(2022, 9, 1, 12, 45, 0).toJSON(),
        modificationDate: new Date().toJSON()
    },
    {
        employeeId: 8,
        employeeName: 'Adam Kowalski',
        employeePosition: `${employeePositionsData[6].employeePositionName}`,
        employeeStatus: false,
        employeeCode: 2593,
        additionalInformation: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat, aspernatur vel, molestiae ad iste id doloremque quod delectus officiis iusto soluta, exercitationem facere deserunt eos sed ipsum blanditiis nesciunt dolore animi commodi explicabo aut? Ab eligendi ratione voluptatem vitae inventore nobis quis omnis animi aspernatur nisi, consequuntur, nemo tempora laboriosam, perferendis nesciunt et iusto ea debitis cupiditate quam quibusdam.',
        dateAdded: new Date(2022, 9, 1, 12, 45, 0).toJSON(),
        modificationDate: new Date().toJSON()
    }
];