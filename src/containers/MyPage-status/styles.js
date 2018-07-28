export const myPageStyles = {
    outerContainer: {
        position: 'absolute',
        top: 'calc(256px + 85px)',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '1060px',
    },
    innerContainer: {
        position: 'relative',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        width: '1080px',
        height: '100%',
        margin: '0 auto'
    },
    statusBox: {
        width: '320px',
        height: '565px',
        position: 'relative',
        margin: '0 150px 0 90px'
    },
    statusPic: {
        width: '230px',
        height: '230px',
        background: 'linear-gradient(45deg, rgba(0,0,0,1), rgba(255,255,255,1))',
        position: 'absolute',
        borderRadius: '115px',
        top: '0',
        right: '45px',
        textAlign: 'center',
        lineHeight: '230px',
        fontSize: '35px',
        zIndex: 1
    },
    statusData: {
        width: '320px',
        height: '450px',
        position: 'relative',
        top: '115px',
        border:' 1px solid #000'
    },
    userNameAddress: {
        height: '30px',
        lineHeight: '30px',
        fontSize: '12px',
        position: 'relative',
        width: '100%',
        top: '160px',
        textAlign: 'center'
    },
    userBalance: {
        height: '30px',
        lineHeight: '30px',
        fontSize: '12px',
        position: 'relative',
        width: '100%',
        top: '220px',
        textAlign: 'center'
    },
    ethBalance: {
        color: 'white',
        width: '160px',
        height: '25px',
        lineHeight: '25px',
        margin: '0 auto',
        position: 'relative',
        top: '220px',
        fontSize: '12px',
        textAlign: 'center',
        backgroundSize: '160px 25px'
    },
    activityBox: {
        width: '510px',
        height: '480px',
        position: 'relative',
        marginTop: '112px'
    },
    activityTitle: {
        width: '100%',
        height:'30px',
        borderBottom: '2px solid #000',
        textAlign: 'left',
        position: 'relative'
    },
    activityHistory: {
        width: '100%',
        height: '280px',
        paddingTop:'7px',
        position: 'relative'
    },
    activityMore: {
        position: 'absolute',
        right: 0,
        outline: 'none',
        border: 'none',
        background: 'none'
    },
    statusPageTicket: {
        width: '100%',
        height: '130px',
    },
    ticketTitle: {
        width: '100%',
        height: '38px',
        borderBottom: '2px solid #000',
        textAlign: 'left',
        position: 'relative'
    },
    ticketMoreButton :{
        outline: 'none',
        border: 'none'
    },
    ticketCardContainer: {
        width: '100%',
        height: '60px',
    },
    statusHorseList: {
        width: '1080px',
        height: '380px',
        marginTop: '80px'
    },
    statusHorseLisTitle: {
        width: '100%',
        height: '40px',
        textAlign: 'left',
        borderBottom: '2px solid #000'
    },
    statusPageHorseList: {
        width: '100%',
        height: '270px',
        display: 'flex',
        alignContent: 'flex-start',
        marginTop: '56px',
    }
};


export const modalStyles = {
    modalBase: {
        content: {
            top : '50%',
            left  : '50%',
            right : 'auto',
            bottom : 'auto',
            transform : 'translate(-50%, -50%)',
            position: 'absolute',
            width: '1080px',
            height: '90%',
            minHeight: '650px',
            padding: 0,
            zIndex: 8888
        }
    },
    modalHeader: {
        width: '100%',
        height: '70px',
        backgroundColor: 'black',
        color: 'white',
        lineHeight: '70px',
        textAlign: 'center',
        fontSize: '24px'
    },
    modalHeaderBottom: {
        textAlign: 'left',
        borderBottom: '1px solid #000',
        width: '900px',
        margin: '56px auto 0'
    },
    modalContent: {
        width: '860px',
        height: 'calc(100% - 160px)',
        margin: '0 auto',
        position: 'relative'
    },
    modalContentTop: {
        width: '100%',
        height: '120px',
        lineHeight: '120px',
        fontSize: '16px',
        textAlign: 'left'
    },
    modalContentMain: {
        width: '100%',
        height: 'calc(100% - 120px)',
        display: 'flex'
    },
    ticketContainer: {
        width: '18.6%',
        height: '100%',
    },
    horseContainer: {
        width: '81.4%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap'
    },
    ticket:{
        width: '90px',
        height: '120px',
        marginBottom: '28px',
        position: 'relative',
    },
    ticketButton: function(ticketName, currentSelected){
        return {
            width: '90px',
            height: '90px',
            borderRadius: '10px',
            outline: 'none',
            backgroundColor: ticketName === currentSelected ? 'rgba(0,0,0,0.3)' : 'transparent',
            border: '1px solid #000',
            backgroundSize: '90px 90px',
        }
    },
    comingSoon:(className) => (
        {
            position: 'absolute',
            transform: 'translate(-50%,-50%) rotate(-30deg)',
            left: '50%',
            top: '40%',
            color: 'red',
            display:  className !== 'dressUpTicket' ? 'none' : 'block',
            opacity: 1
        }
    ),
    ticketUseButtonWrapper: {
        height: '20px',
        width: '100%',
        textAlign: 'left',
        lineHeight: '20px',
    },
    userButton: {
        height: '20px',
        width: '56px',
        color: 'white',
        backgroundSize: '56px 20px',
        border: 'none',
        outline: 'none'
    },
    ticketNum: {
        float: 'right',
    },

};

