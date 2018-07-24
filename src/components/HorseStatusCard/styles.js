export const styles = (props) =>  ({
    horseStatusCard: {
        width: '225px',
        height: '275px',
        marginLeft: props.isLeft ? '0' : '56px',
        marginBottom: '3%'
    },
    horseStatus: {
        width: '228px',
        height: '30px',
        marginTop: '14px',
        textAlign: 'left',
        fontSize: '21px',
        display: 'flex'
    },
    powerTotal: {
        height: '20px',
        width: '100%',
        position: 'absolute',
        fontSize: '15px',
        bottom: '14px',
        textAlign: 'center'
    },
    powerTotalP: {
        lineHeight: '20px'
    },
    powerImg: {
        position: 'absolute',
        right: '100px',
        top: 0,
        height: '30px',
        width: 'auto'
    },
});

export const STYLE = {
    powerNum: {
        position: 'absolute',
        right: '106px',
        fontSize: '15px',
        lineHeight: '30px',
        top: 0,
        color: 'black',
        zIndex: 3,
    },
    horseStatsP: {
        fontSize: '15px',
        lineHeight: '30px',
        display: 'inline-block',
        marginLeft: '7px'
    },
    horseName: {
        fontSize: '21px',
        width: '65%',
        paddingLeft: '1px'
    },
    horsePowerDiagram: {
        height: '30px',
        width: '100%',
        position: 'relative',
        marginTop: '14px'
    },
    horseImageBack: {
        width: '225px',
        height: '225px',
        backgroundSize: '225px 225px',
        position: 'relative'
    },
    horsePriceImg: {
        width: '85px',
        height: '20px',
        position: 'absolute',
        left: '50%',
        top: '20px',
        transform: 'translateX(-50%)',
        lineHeight: '20px',
        textAlign: 'center'
    },
    strengthParam: function(width){
        return ({
            height: '100%',
            width: width+'%',
            float: 'left',
            backgroundColor: 'rgba(0,0,0,0.2)'
        })
    },
    speedParam: function(width){
        return ({
            height: '100%',
            width: width+'%',
            float: 'left',
            backgroundColor: 'rgba(0,0,0,0.4)'
        })
    },
    staminaParam: function(width){
        return ({
            height: '100%',
            width: width+'%',
            float: 'left',
            backgroundColor: 'rgba(0,0,0,0.6)'
        })
    },
    intelligenceParam: function(width){
        return ({
            height: '100%',
            width: width+'%',
            float: 'left',
            backgroundColor: 'rgba(0,0,0,0.8)'
        })
    },
    luckParam: function(width){
        return ({
            height: '100%',
            width: width+'%',
            float: 'left',
            backgroundColor: 'rgba(0,0,0,1)'
        })
    },
    iconImg: {
        width: '25px',
        height: '25px',
        right: '35px',
        bottom: '0px',
        position: 'absolute'
    },
    rankImg: {
        width: '25px',
        height: '28px',
        position: 'absolute',
        right: '0px',
        bottom: '0px'
    }
};
