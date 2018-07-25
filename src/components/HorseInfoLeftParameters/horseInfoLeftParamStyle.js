export const hILeftParamStyle = {
    container: {
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    placeText: {
        width: '300px',
        height: '25px',
        textAlign: 'left',
        lineHeight: '25px',
        fontSize: '15px',
        backgroundColor: 'black',
        color: 'white',
        paddingLeft: '10px'
    },
    powerTotalTex: {
        width: '100%',
        height: '75px',
        lineHeight: '75px',
        fontSize: '21px',
        textAlign: 'left'
    },
    horseParamDiagram: {
        height: '30px',
        width: '100%',
        position: 'relative',
        marginTop: '14px'
    },
    strengthParam: (status,backColorAlpha) => ({
        height: '100%',
        float: 'left',
        backgroundColor: `rgba(0,0,0,${backColorAlpha})`,
        width: Math.ceil(status / 1000 * 20)+"%"
    }),
    statusParamDiagram: {
        width: '300px',
        height: '100px',
        marginTop: '30px',
        paddingBottom: '35px',
        borderBottom: '2px solid rgba(0,0,0,0.5)',
        position: 'relative'
    },
    sireAndRaceNum: {
        width: '300px',
        height: '30px',
        marginTop: '35px',
        position: 'relative'
    },
    sireRaceNumP: {
        lineHeight: '15px',
        height: '15px',
        textAlign: 'left',
        fontSize: '15px'
    }
};
