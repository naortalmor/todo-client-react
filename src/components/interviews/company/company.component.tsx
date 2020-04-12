import React from 'react';
import { CompanyComponentProps } from './company.connector';
import { Interview, InterviewQuestion } from '../../../interfaces/interviews.interface';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { InterviewComponent } from '../interviews/interviews.component';

export class CompanyComponent extends React.Component<CompanyComponentProps> {
    render() {
        const interviews = this.props.interviews.map((interview:Interview) => (
            <InterviewComponent key={interview.id} 
                                interview={interview} questions={this.props.interviewQuestions}>
            </InterviewComponent>));
        return (
            <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}
                                           aria-label="Expand"
                                           aria-controls="additional-actions1-content"
                                           id={this.props.company.id}>
                        {this.props.company.name}
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {interviews}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
        )
    }
}