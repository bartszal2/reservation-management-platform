import { meetingDataType } from "../types/meetingDataType";
import { employeeresExampleData } from "./employeeresExampleData";
import { meetingsCategoriesData } from "./meetingsCategoriesData";
import { roomsExampleData } from "./roomsExampleData";

export const meetingsExampleData: meetingDataType[] = [
    {
        meetingId: 1,
        meetingName: 'Spotkanie Lorem Ipsum 1',
        meetingCategory: `${meetingsCategoriesData[5].meetingCategoryName}`,
        roomName: `${roomsExampleData[0].roomName}`,
        employeeName: `${employeeresExampleData[0].employeeName}`,
        meetingPeopleNumber: 25,
        meetingDate: new Date().toJSON(),
        meetingTimeStart: '08:00',
        meetingTimeEnd: '10:30',
        additionalInformation: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat, aspernatur vel, molestiae ad iste id doloremque quod delectus officiis iusto soluta, exercitationem facere deserunt eos sed ipsum blanditiis nesciunt dolore animi commodi explicabo aut? Ab eligendi ratione voluptatem vitae inventore nobis quis omnis animi aspernatur nisi, consequuntur, nemo tempora laboriosam, perferendis nesciunt et iusto ea debitis cupiditate quam quibusdam.',
        dateAdded: new Date(new Date().setDate(new Date().getDate() - 8)).toJSON(),
        modificationDate: null
    },
    {
        meetingId: 2,
        meetingName: 'Spotkanie Lorem Ipsum 2',
        meetingCategory: `${meetingsCategoriesData[4].meetingCategoryName}`,
        roomName: `${roomsExampleData[0].roomName}`,
        employeeName: `${employeeresExampleData[1].employeeName}`,
        meetingPeopleNumber: 21,
        meetingDate: new Date().toJSON(),
        meetingTimeStart: '10:45',
        meetingTimeEnd: '14:00',
        additionalInformation: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat, aspernatur vel, molestiae ad iste id doloremque quod delectus officiis iusto soluta, exercitationem facere deserunt eos sed ipsum blanditiis nesciunt dolore animi commodi explicabo aut? Ab eligendi ratione voluptatem vitae inventore nobis quis omnis animi aspernatur nisi, consequuntur, nemo tempora laboriosam, perferendis nesciunt et iusto ea debitis cupiditate quam quibusdam.',
        dateAdded: new Date(new Date().setDate(new Date().getDate() - 4)).toJSON(),
        modificationDate: null
    },
    {
        meetingId: 3,
        meetingName: 'Spotkanie Lorem Ipsum 3',
        meetingCategory: `${meetingsCategoriesData[1].meetingCategoryName}`,
        roomName: `${roomsExampleData[0].roomName}`,
        employeeName: `${employeeresExampleData[0].employeeName}`,
        meetingPeopleNumber: 14,
        meetingDate: new Date().toJSON(),
        meetingTimeStart: '14:25',
        meetingTimeEnd: '18:00',
        additionalInformation: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat, aspernatur vel, molestiae ad iste id doloremque quod delectus officiis iusto soluta, exercitationem facere deserunt eos sed ipsum blanditiis nesciunt dolore animi commodi explicabo aut? Ab eligendi ratione voluptatem vitae inventore nobis quis omnis animi aspernatur nisi, consequuntur, nemo tempora laboriosam, perferendis nesciunt et iusto ea debitis cupiditate quam quibusdam.',
        dateAdded: new Date(new Date().setDate(new Date().getDate() - 3)).toJSON(),
        modificationDate: null
    },
    {
        meetingId: 4,
        meetingName: 'Spotkanie Lorem Ipsum 4',
        meetingCategory: `${meetingsCategoriesData[0].meetingCategoryName}`,
        roomName: `${roomsExampleData[0].roomName}`,
        employeeName: `${employeeresExampleData[0].employeeName}`,
        meetingPeopleNumber: 18,
        meetingDate: new Date().toJSON(),
        meetingTimeStart: '18:10',
        meetingTimeEnd: '20:00',
        additionalInformation: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat, aspernatur vel, molestiae ad iste id doloremque quod delectus officiis iusto soluta, exercitationem facere deserunt eos sed ipsum blanditiis nesciunt dolore animi commodi explicabo aut? Ab eligendi ratione voluptatem vitae inventore nobis quis omnis animi aspernatur nisi, consequuntur, nemo tempora laboriosam, perferendis nesciunt et iusto ea debitis cupiditate quam quibusdam.',
        dateAdded: new Date(new Date().setDate(new Date().getDate() - 6)).toJSON(),
        modificationDate: null
    },
    {
        meetingId: 5,
        meetingName: 'Spotkanie Lorem Ipsum 5',
        meetingCategory: `${meetingsCategoriesData[3].meetingCategoryName}`,
        roomName: `${roomsExampleData[1].roomName}`,
        employeeName: `${employeeresExampleData[2].employeeName}`,
        meetingPeopleNumber: 32,
        meetingDate: new Date(2022, 9, 14, 0, 0, 0).toJSON(),
        meetingTimeStart: '13:00',
        meetingTimeEnd: '18:00',
        additionalInformation: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat, aspernatur vel, molestiae ad iste id doloremque quod delectus officiis iusto soluta, exercitationem facere deserunt eos sed ipsum blanditiis nesciunt dolore animi commodi explicabo aut? Ab eligendi ratione voluptatem vitae inventore nobis quis omnis animi aspernatur nisi, consequuntur, nemo tempora laboriosam, perferendis nesciunt et iusto ea debitis cupiditate quam quibusdam.',
        dateAdded: new Date(2022, 9, 1, 12, 45, 0).toJSON(),
        modificationDate: null
    },
    {
        meetingId: 6,
        meetingName: 'Spotkanie Lorem Ipsum 6',
        meetingCategory: `${meetingsCategoriesData[2].meetingCategoryName}`,
        roomName: `${roomsExampleData[0].roomName}`,
        employeeName: `${employeeresExampleData[5].employeeName}`,
        meetingPeopleNumber: 25,
        meetingDate: new Date(2023, 9, 24, 0, 0, 0).toJSON(),
        meetingTimeStart: '12:00',
        meetingTimeEnd: '16:00',
        additionalInformation: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat, aspernatur vel, molestiae ad iste id doloremque quod delectus officiis iusto soluta, exercitationem facere deserunt eos sed ipsum blanditiis nesciunt dolore animi commodi explicabo aut? Ab eligendi ratione voluptatem vitae inventore nobis quis omnis animi aspernatur nisi, consequuntur, nemo tempora laboriosam, perferendis nesciunt et iusto ea debitis cupiditate quam quibusdam.',
        dateAdded: new Date(new Date().setDate(new Date().getDate() - 12)).toJSON(),
        modificationDate: null
    },
    {
        meetingId: 7,
        meetingName: 'Spotkanie Lorem Ipsum 7',
        meetingCategory: `${meetingsCategoriesData[4].meetingCategoryName}`,
        roomName: `${roomsExampleData[5].roomName}`,
        employeeName: `${employeeresExampleData[5].employeeName}`,
        meetingPeopleNumber: 26,
        meetingDate: new Date(2022, 9, 25, 0, 0, 0).toJSON(),
        meetingTimeStart: '14:00',
        meetingTimeEnd: '16:00',
        additionalInformation: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat, aspernatur vel, molestiae ad iste id doloremque quod delectus officiis iusto soluta, exercitationem facere deserunt eos sed ipsum blanditiis nesciunt dolore animi commodi explicabo aut? Ab eligendi ratione voluptatem vitae inventore nobis quis omnis animi aspernatur nisi, consequuntur, nemo tempora laboriosam, perferendis nesciunt et iusto ea debitis cupiditate quam quibusdam.',
        dateAdded: new Date(2022, 9, 1, 12, 45, 0).toJSON(),
        modificationDate: null
    },
    {
        meetingId: 8,
        meetingName: 'Spotkanie Lorem Ipsum 8',
        meetingCategory: `${meetingsCategoriesData[1].meetingCategoryName}`,
        roomName: `${roomsExampleData[0].roomName}`,
        employeeName: `${employeeresExampleData[1].employeeName}`,
        meetingPeopleNumber: 19,
        meetingDate: new Date(2023, 9, 28, 0, 0, 0).toJSON(),
        meetingTimeStart: '08:00',
        meetingTimeEnd: '10:30',
        additionalInformation: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat, aspernatur vel, molestiae ad iste id doloremque quod delectus officiis iusto soluta, exercitationem facere deserunt eos sed ipsum blanditiis nesciunt dolore animi commodi explicabo aut? Ab eligendi ratione voluptatem vitae inventore nobis quis omnis animi aspernatur nisi, consequuntur, nemo tempora laboriosam, perferendis nesciunt et iusto ea debitis cupiditate quam quibusdam.',
        dateAdded: new Date(2022, 9, 1, 12, 45, 0).toJSON(),
        modificationDate: null
    },
    {
        meetingId: 9,
        meetingName: 'Spotkanie Lorem Ipsum 9',
        meetingCategory: `${meetingsCategoriesData[2].meetingCategoryName}`,
        roomName: `${roomsExampleData[5].roomName}`,
        employeeName: `${employeeresExampleData[0].employeeName}`,
        meetingPeopleNumber: 40,
        meetingDate: new Date(2022, 10, 20, 0, 0, 0).toJSON(),
        meetingTimeStart: '11:30',
        meetingTimeEnd: '14:30',
        additionalInformation: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat, aspernatur vel, molestiae ad iste id doloremque quod delectus officiis iusto soluta, exercitationem facere deserunt eos sed ipsum blanditiis nesciunt dolore animi commodi explicabo aut? Ab eligendi ratione voluptatem vitae inventore nobis quis omnis animi aspernatur nisi, consequuntur, nemo tempora laboriosam, perferendis nesciunt et iusto ea debitis cupiditate quam quibusdam.',
        dateAdded: new Date(2022, 9, 1, 12, 45, 0).toJSON(),
        modificationDate: null
    },
    {
        meetingId: 10,
        meetingName: 'Spotkanie Lorem Ipsum 10',
        meetingCategory: `${meetingsCategoriesData[0].meetingCategoryName}`,
        roomName: `${roomsExampleData[1].roomName}`,
        employeeName: `${employeeresExampleData[2].employeeName}`,
        meetingPeopleNumber: 29,
        meetingDate: new Date(2023, 10, 21, 0, 0, 0).toJSON(),
        meetingTimeStart: '13:00',
        meetingTimeEnd: '16:30',
        additionalInformation: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat, aspernatur vel, molestiae ad iste id doloremque quod delectus officiis iusto soluta, exercitationem facere deserunt eos sed ipsum blanditiis nesciunt dolore animi commodi explicabo aut? Ab eligendi ratione voluptatem vitae inventore nobis quis omnis animi aspernatur nisi, consequuntur, nemo tempora laboriosam, perferendis nesciunt et iusto ea debitis cupiditate quam quibusdam.',
        dateAdded: new Date(2022, 9, 1, 12, 45, 0).toJSON(),
        modificationDate: null
    },
    {
        meetingId: 11,
        meetingName: 'Spotkanie Lorem Ipsum 11',
        meetingCategory: `${meetingsCategoriesData[3].meetingCategoryName}`,
        roomName: `${roomsExampleData[1].roomName}`,
        employeeName: `${employeeresExampleData[2].employeeName}`,
        meetingPeopleNumber: 33,
        meetingDate: new Date(2023, 12, 12, 0, 0, 0).toJSON(),
        meetingTimeStart: '09:00',
        meetingTimeEnd: '13:00',
        additionalInformation: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat, aspernatur vel, molestiae ad iste id doloremque quod delectus officiis iusto soluta, exercitationem facere deserunt eos sed ipsum blanditiis nesciunt dolore animi commodi explicabo aut? Ab eligendi ratione voluptatem vitae inventore nobis quis omnis animi aspernatur nisi, consequuntur, nemo tempora laboriosam, perferendis nesciunt et iusto ea debitis cupiditate quam quibusdam.',
        dateAdded: new Date(2022, 9, 1, 12, 45, 0).toJSON(),
        modificationDate: null
    },
    {
        meetingId: 12,
        meetingName: 'Spotkanie Lorem Ipsum 12',
        meetingCategory: `${meetingsCategoriesData[5].meetingCategoryName}`,
        roomName: `${roomsExampleData[1].roomName}`,
        employeeName: `${employeeresExampleData[0].employeeName}`,
        meetingPeopleNumber: 16,
        meetingDate: new Date(2022, 12, 10, 0, 0, 0).toJSON(),
        meetingTimeStart: '08:00',
        meetingTimeEnd: '14:00',
        additionalInformation: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat, aspernatur vel, molestiae ad iste id doloremque quod delectus officiis iusto soluta, exercitationem facere deserunt eos sed ipsum blanditiis nesciunt dolore animi commodi explicabo aut? Ab eligendi ratione voluptatem vitae inventore nobis quis omnis animi aspernatur nisi, consequuntur, nemo tempora laboriosam, perferendis nesciunt et iusto ea debitis cupiditate quam quibusdam.',
        dateAdded: new Date(2022, 9, 1, 12, 45, 0).toJSON(),
        modificationDate: null
    },
];