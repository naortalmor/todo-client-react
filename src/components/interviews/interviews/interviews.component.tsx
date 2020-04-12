import React from 'react';
import { InterviewProps } from './interviews.connector';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export class InterviewComponent extends React.Component<InterviewProps> {
    render() {
        return (
            <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}
                                           aria-label="Expand"
                                           aria-controls="additional-actions1-content"
                                           id={this.props.interview.id}>
                        {this.props.interview.type} --- {this.props.interview.status}
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div>
                            BLA
                        </div>
                    </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}