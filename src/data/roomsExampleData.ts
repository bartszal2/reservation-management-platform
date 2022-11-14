import { roomDataType } from "../types/roomDataType";
import { roomTypesData } from "./roomTypesData";

export const roomsExampleData: roomDataType[] = [
    {
        roomId: 1,
        roomName: 'Pomieszczenie Lorem Ipsum 1',
        roomNumber: '001',
        minimumRoomPeople: 1,
        maximumRoomPeople: 35,
        roomStatus: true,
        roomType: `${roomTypesData[1].roomTypeName}`,
        additionalInformation: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat, aspernatur vel, molestiae ad iste id doloremque quod delectus officiis iusto soluta, exercitationem facere deserunt eos sed ipsum blanditiis nesciunt dolore animi commodi explicabo aut? Ab eligendi ratione voluptatem vitae inventore nobis quis omnis animi aspernatur nisi, consequuntur, nemo tempora laboriosam, perferendis nesciunt et iusto ea debitis cupiditate quam quibusdam.',
        dateAdded: new Date(2022, 9, 1, 12, 45, 0).toJSON(),
        modificationDate: null
    },
    {
        roomId: 2,
        roomName: 'Pomieszczenie Lorem Ipsum 2',
        roomNumber: '002',
        minimumRoomPeople: 8,
        maximumRoomPeople: 40,
        roomStatus: true,
        roomType: `${roomTypesData[3].roomTypeName}`,
        additionalInformation: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat, aspernatur vel, molestiae ad iste id doloremque quod delectus officiis iusto soluta, exercitationem facere deserunt eos sed ipsum blanditiis nesciunt dolore animi commodi explicabo aut? Ab eligendi ratione voluptatem vitae inventore nobis quis omnis animi aspernatur nisi, consequuntur, nemo tempora laboriosam, perferendis nesciunt et iusto ea debitis cupiditate quam quibusdam.',
        dateAdded: new Date(2022, 9, 1, 12, 45, 0).toJSON(),
        modificationDate: new Date().toJSON()
    },
    {
        roomId: 3,
        roomName: 'Pomieszczenie Lorem Ipsum 3',
        roomNumber: '003',
        minimumRoomPeople: 1,
        maximumRoomPeople: 16,
        roomStatus: true,
        roomType: `${roomTypesData[0].roomTypeName}`,
        additionalInformation: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat, aspernatur vel, molestiae ad iste id doloremque quod delectus officiis iusto soluta, exercitationem facere deserunt eos sed ipsum blanditiis nesciunt dolore animi commodi explicabo aut? Ab eligendi ratione voluptatem vitae inventore nobis quis omnis animi aspernatur nisi, consequuntur, nemo tempora laboriosam, perferendis nesciunt et iusto ea debitis cupiditate quam quibusdam.',
        dateAdded: new Date(2022, 9, 1, 12, 45, 0).toJSON(),
        modificationDate: new Date().toJSON()
    },
    {
        roomId: 4,
        roomName: 'Pomieszczenie Lorem Ipsum 4',
        roomNumber: '004',
        minimumRoomPeople: 1,
        maximumRoomPeople: 25,
        roomStatus: false,
        roomType: `${roomTypesData[2].roomTypeName}`,
        additionalInformation: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat, aspernatur vel, molestiae ad iste id doloremque quod delectus officiis iusto soluta, exercitationem facere deserunt eos sed ipsum blanditiis nesciunt dolore animi commodi explicabo aut? Ab eligendi ratione voluptatem vitae inventore nobis quis omnis animi aspernatur nisi, consequuntur, nemo tempora laboriosam, perferendis nesciunt et iusto ea debitis cupiditate quam quibusdam.',
        dateAdded: new Date(2022, 9, 1, 12, 45, 0).toJSON(),
        modificationDate: null
    },
    {
        roomId: 5,
        roomName: 'Pomieszczenie Lorem Ipsum 5',
        roomNumber: '005',
        minimumRoomPeople: 5,
        maximumRoomPeople: 15,
        roomStatus: false,
        roomType: `${roomTypesData[5].roomTypeName}`,
        additionalInformation: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat, aspernatur vel, molestiae ad iste id doloremque quod delectus officiis iusto soluta, exercitationem facere deserunt eos sed ipsum blanditiis nesciunt dolore animi commodi explicabo aut? Ab eligendi ratione voluptatem vitae inventore nobis quis omnis animi aspernatur nisi, consequuntur, nemo tempora laboriosam, perferendis nesciunt et iusto ea debitis cupiditate quam quibusdam.',
        dateAdded: new Date(2022, 9, 1, 12, 45, 0).toJSON(),
        modificationDate: new Date().toJSON()
    },
    {
        roomId: 6,
        roomName: 'Pomieszczenie Lorem Ipsum 6',
        roomNumber: '006',
        minimumRoomPeople: 1,
        maximumRoomPeople: 45,
        roomStatus: true,
        roomType: `${roomTypesData[4].roomTypeName}`,
        additionalInformation: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat, aspernatur vel, molestiae ad iste id doloremque quod delectus officiis iusto soluta, exercitationem facere deserunt eos sed ipsum blanditiis nesciunt dolore animi commodi explicabo aut? Ab eligendi ratione voluptatem vitae inventore nobis quis omnis animi aspernatur nisi, consequuntur, nemo tempora laboriosam, perferendis nesciunt et iusto ea debitis cupiditate quam quibusdam.',
        dateAdded: new Date(2022, 9, 1, 12, 45, 0).toJSON(),
        modificationDate: null
    }
];