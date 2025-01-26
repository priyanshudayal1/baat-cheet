export const formatMessageTime = (date) => {
    if (!date) return '';
    
    const messageDate = new Date(date);
    if (isNaN(messageDate.getTime())) return '';
    
    const currentDate = new Date();
    const isSameDay = messageDate.toDateString() === currentDate.toDateString();
    const isSameYear = messageDate.getFullYear() === currentDate.getFullYear();
    
    if (isSameDay) {
        return messageDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }
    
    if (isSameYear) {
        return messageDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }
    
    return messageDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
};