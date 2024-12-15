import { RiPlantFill } from 'react-icons/ri';

const GoalStatusBar = ({pledgePercent, remainderPercent}) => {
    return (
        <>
            <svg width='0' height='0'>
                <defs>
                    <linearGradient
                        id='split-color'
                        x1='0'
                        x2='0'
                        y1='0'
                        y2='1'
                    >
                        <stop
                            offset={`${remainderPercent}%`}
                            stopColor='#ebe5e5'
                        />
                        <stop
                            offset={`${pledgePercent + 15}%`}
                            stopColor='#425e2f'
                        />
                        <stop
                            offset={`${pledgePercent}%`}
                            stopColor='#425e2f'
                        />
                    </linearGradient>
                </defs>
            </svg>
            <RiPlantFill
                style={{ fill: 'url(#split-color)', fontSize: '220px' }}
            />
        </>
    );
};
export default GoalStatusBar;
