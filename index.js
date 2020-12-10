function findNum(arr, i) {
    if (arr[0] === i) return true;
    let middle = arr.length / 2 | 0;
    let middleValue = arr.splice(middle, 1)[0];
    if (middleValue > i) {
        findNum(arr.slice(0, middle), i);
    } else {
        findNum(arr.slice(middle), i);
    }
    return false;
}