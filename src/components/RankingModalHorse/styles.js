export const rankStyles = {
    container: (isOwner) => ({
        height: '70px',
        width: '100%',
        display: 'flex',
        borderBottom: '1px solid #000',
        backgroundColor: isOwner ? 'rgba(30,30,30,0.3)' : 'white',
    }),
    rankNumber: {
        textAlign: 'center',
        lineHeight: '70px',
        width: '70px',
        fontSize: '14px'
    },
    horseImageContainer:{
        width: '60px',
        height: '60px',
        backgroundSize: '60px 60px',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        top: '5px'
    },
    horseName: {
        width: '260px',
        height: '100%',
        lineHeight: '70px',
        textAlign: 'center'
    },
    winCountContainer: {
        width: '70px',
        height: '100%',
        textAlign: 'center',
        lineHeight: '70px',
    },
    totalPrizeContainer: {
        width: '70px',
        height: '100%',
        textAlign: 'center',
        lineHeight: '70px',
        marginLeft: '28px'
    },

    strengthContainer: {
        width: '120px',
        height: '100%',
        textAlign: 'center',
        lineHeight: '70px',
        marginLeft: '28px'
    }
};
