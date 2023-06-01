import React, { Component } from "react";

export class UpdateAssignTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TopicName: '',
            ErrorTopicName: null,
            Description: '',
            LeaderName: '',
            GenreName: 'Kinh Doanh',
            WriterName: '',
            ReporterName: '',
            ErrorDeadline: '',
            LeaderId: 0,
            GenreId: 0,
            LeaderId: 0,
            WriterId: 0,
            ReporterId: 0,
            StartDate: '',
            EndDate: '',
            Genre: [],
            User: [],
            A: {}
        }
    }

    refreshList() {
        fetch("https://localhost:7248/api/AssignTask/GetAssignTaskById?Id=6")
            .then(response => response.json())
            .then(data => {
                this.setState({ TopicName: data.title });
            });
            console.log(this.state.TopicName);
    }

    componentDidMount() {
        this.refreshList();
    }

    updateClick() {
        fetch('https://localhost:7248/api/AssignTask/UpdateAssignTask', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmployeeId: this.state.EmployeeId,
                EmployeeName: this.state.EmployeeName,
                Department: this.state.Department,
                DateOfJoining: this.state.DateOfJoining,
                PhotoFileName: this.state.PhotoFileName
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }
    render() {
        return <div></div>
    }
}