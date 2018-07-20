export const styles =  {
    outerContainer: {
        position: 'absolute',
        top: 'calc(256px + 4.5%)',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '1350px'
    },
    innerContainer: {
        position: 'relative',
        display: 'flex',
        flexWrap: 'wrap',
        width: '1080px',
        height: '100%',
        margin: '100px auto 0'
    },
    rankingContainer: {
        height: '360px',
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap'
    },
    rankTitle: {
        textAlign: 'left',
        fontSize: '18px',
        height: '30px',
        width: '100%',
        borderBottom: '2px solid #000'
    },
    showMore:{
        backgroundColor: 'transparent',
        position: 'absolute',
        right: '0',
        outline: 'none',
        border: 'none'
    },
    modalContent: {
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    modalTitle: {
        width: '100%',
        height: '75px',
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        lineHeight: '75px',
        fontSize: '24px'
    },
    modalTopLabels: {
        height: '30px',
        width: '900px',
        position: 'relative',
        margin: '56px auto 0'
    },
    modalTopLabelContainer: {
        height: '100%',
        position: 'absolute',
        width: '515px',
        left: '390px',
        display: 'flex',
        fontSize: '12px'
    },
    topLabelWinCount: (type)=> ({
        width: '70px',
        height: '30px',
        lineHeight: '30px',
        textAlign: 'center',
        backgroundColor: type === 'win-count' ? 'black' : 'white',
        color: type === 'win-count' ? 'white' : 'black'
    }),
    topLabelTotalPrize: (type) => ({
        width: '70px',
        height: '30px',
        lineHeight: '30px',
        marginLeft: '28px',
        textAlign: 'center',
        backgroundColor: type === 'total-prize' ? 'black' : 'white',
        color: type === 'total-prize' ? 'white' : 'black'
    }),
    topLabelRarity: {
        width: '100px',
        height: '30px',
        lineHeight: '30px',
        textAlign: 'center',
        marginLeft: '63px',
    },
    topLabelPowerTotal:(type) => ({
        width: '120px',
        height:'30px',
        lineHeight: '30px',
        marginLeft: '42px',
        marginRight: '21px',
        textAlign: 'center',
        backgroundColor: type === 'strength' ? 'black' : 'white',
        color: type === 'strength' ? 'white' : 'black'
    }),
    modalRankContents: {
        width: '900px',
        height: 'calc(100% - 131px)',
        margin: '0 auto'
    },
};

export const modalStyle = {
    content: {
        top : '50%',
        left  : '50%',
        right : 'auto',
        bottom : 'auto',
        marginRight : '-50%',
        transform : 'translate(-50%, -50%)',
        height: '80%',
        width: '1080px',
        position: 'absolute',
        padding: 0,
        zIndex: 8888
    }
};
