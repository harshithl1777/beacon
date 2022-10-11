import md5 from "md5";

const useStoreID = (coordinates) => {
    const formattedCoordinates = `${coordinates.longitude}, ${coordinates.latitude}`;
    const storeID = md5(formattedCoordinates);
    return storeID;
};

export default useStoreID;
