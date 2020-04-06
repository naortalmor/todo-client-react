import React from 'react';

interface HeaderProps {
    mode?:string
}

export class AppHeaderComponent extends React.Component {
    render() {
        return (
            <div className="row header">
                <HeaderTab tabName="test" isSelected={false}/>
                <HeaderTab tabName="test" isSelected={false}/>
                <HeaderTab tabName="test" isSelected={false}/>
            </div>
        )
    }
}

interface TabProps {
    tabName:string;
    isSelected:boolean;
}

function HeaderTab(props:TabProps) {
    return (
        <div>
            {props.tabName}
        </div>
    )
}