const Utility = {
    sort: function (type, data, key) {
        if (Array.isArray(data) && data.length > 0) {
            if (type) {
                return [...data].sort((a, b) => {
                    const aValue = key === 'engagementScore' ? a.engagementScore : a.reach;
                    const bValue = key === 'engagementScore' ? b.engagementScore : b.reach;

                    if (typeof aValue === 'number' && typeof bValue === 'number') {
                        return type === 'asc' ? aValue - bValue : bValue - aValue;
                    }
                    return 0;
                });
            }
        }
        return data;
    }
};

export default Utility;
