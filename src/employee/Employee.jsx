import React from 'react';
import './css/employeeStyle.css';

class Employee extends React.Component {
    constructor(props){
        super(props);
        this.state={
            name: '',
            id: '',
            department: '',
            email: '',
            doj: '',
            list: [],
            errormessage: '',
        };
        this.addEmployee = this.addEmployee.bind(this);
        this.clear = this.clear.bind(this);
        this.dropValue = this.dropValue.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    /**
     * To open the modal
     */
    addEmployee() {
        // Get the modal
        var modal = document.getElementById("myModal");
        modal.style.display="block";
    }

    /**
     * To close the modal
     */
    closeModal() {
        // Get the modal
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }

    /**
     * Update the form values in the state and list of values
     */
    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        let err = '';
        if (nam === "id") {
          if (val !="" && !Number(val)) {
            err = <strong>Your id must be a number</strong>;
          }
        }
        this.setState({errormessage: err});
        this.setState({[nam]: val});
      }

      /**
       * updating the dropdown values
       * @param  event 
       */
      dropValue(event) {
        this.setState({department: event.target.value});
      }

      /**
       * On submitting the form
       */
      mySubmitHandler = (event) => {
        event.preventDefault();
        // let id = this.state.id;
        const { name, id, department, email, doj, list } = this.state;
        console.log('v', name);
        if ( (name !== "") && (id !== "") && (department !== "") && (email !== "") && (doj !== "") ) {
            list.push({
                name,
                id,
                department,
                email,
                doj
            });
            this.setState({list});
            // Get the modal
            var modal = document.getElementById("myModal");
            modal.style.display = "none";
            this.setState({
                department: '',
            });
            document.getElementById("myForm").reset();
        } else {
            alert("Please fill all the fields");
        }
        console.log('subm', this.state);
      }

      /**
       * To remove the values from the list
       * @param {id} id 
       */
    remove(id) {
        const { list } = this.state;
        let updatedValue = list.filter(data => data.id != id);
        this.setState({ list: updatedValue});
    } 

    /**
     * To reset the form
     * @param  event 
     */
    clear(event) {
        event.preventDefault();
        document.getElementById("myForm").reset();
    }

    render() {
        // Get the modal
        var modal = document.getElementById("myModal");

        // Get the button that opens the modal
        var btn = document.getElementById("myBtn");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        // When the user clicks anywhere outside of the modal, close it
        window.onClick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        const { list } = this.state;
        return(
            <>
            <div>
                <h1>Employee Details </h1>
            </div>
            <div>
            <button id="myBtn" className="add" onClick={() => this.addEmployee()}>Add Employee</button>
            <div id="myModal" class="modal">
                <div class="modal-content">
                    <span class="close" onClick={() => this.closeModal()}>&times;</span>
                    <form id="myForm" onSubmit={this.mySubmitHandler}>
                    <input
                        type='text'
                        name='name'
                        placeholder="Employee Name"
                        onChange={this.changeHandler}
                    />
                    <input
                        type='text'
                        name='id'
                        placeholder="Employee Id"
                        onChange={this.changeHandler}
                    />
                     <select value={this.state.department} id="lang" onChange={this.dropValue}>
                        <option value="select">Select</option>
                        <option value="Developer">Developer</option>
                        <option value="Designer">Designer</option>
                        <option value="Tester">Tester</option>
                        <option value="Team Lead">Team Lead</option>
                        <option value="Project Head">Project Head</option>
                    </select>
                    <input
                        type='text'
                        name='email'
                        placeholder="email"
                        onChange={this.changeHandler}
                    />
                    <input type="date" name="doj" placeholder="Date Of joining" onChange={this.changeHandler} />
                    <br/>
                    <input type='submit' />
                    <button className="clear" onClick={this.clear} >Clear</button>
                    {this.state.errormessage}
                    </form>
                </div>
                </div>
            </div>
           <div className="chat">
               <table className="table table-striped">
                   <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Email</th>
                            <th>DOJ</th>
                            <th>Action</th>
                        </tr>
                   </thead>
                   <tbody>
                       {
                   list.map( (data, index) => {
                    return (
                        <tr key={index}>
                            <td>{data.id}</td>
                            <td>{data.name}</td>
                            <td>{data.department}</td>
                            <td>{data.email}</td>
                            <td>{data.doj}</td>
                            <button type="button" className="clear" onClick={this.remove.bind(this, data.id)} >Delete</button>
                        </tr>
                    )
                   })}
                   </tbody>
               </table>
            </div>
            </>
        )
    }
}

export default Employee;