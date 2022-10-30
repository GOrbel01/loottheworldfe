export function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function trimLast(input) {
    return input.slice(0, input.length-1);
}

export function updateMultiItemSingleField(after,field) {
    let result = {};
    for (let i = 0 ; i < after.length; i++) {
        let diff = getDiff(i);
        result[after[i].id] = {};
        result[after[i].id][field] = diff
    }
    return result;
}

function getDiff(after) {
    let res = {};
    res.after = after;
    return res;
}

export function processDiffs(initialState, newState) {
    let results = {};
    let keys = Object.keys(initialState);
    keys.map((key) => {
        let keyAlt = key;
        if (key === 'itemstats') {
            keyAlt = 'statFields';
        }
        if (hasDiff(initialState[key], newState[keyAlt])) {
            results[key] = buildDiff(initialState[key], newState[keyAlt]);
        }
    });
    return results;
}

function hasDiff(initialValue, newValue) {
    if (initialValue && newValue) {
        let result =  initialValue !== newValue;
        return result;
    }
    if (initialValue && !newValue) {
        return false;
    }
    if (!initialValue && newValue) {
        return true;
    }
}

function buildDiff(before, after) {
    return {
        "before": before,
        "after":after
     }
}