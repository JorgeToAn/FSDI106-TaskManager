class Task {
    constructor(important, title, description, date, location, color, emoji, status, notification) {
        this.important = important;
        this.title = title;
        this.description = description;
        this.date = date;
        this.location = location;
        this.color = color;
        this.emoji = emoji;
        this.status = status;
        this.notification = notification;

        this.name = "Jorge"; // <= MY NAME
    }

    isValid(){
        let valid = true;
        
        if(!this.title){
            valid = false;
            $("#txtTitle").addClass("is-invalid");
        }
        if(!this.description){
            valid = false;
            $("#txtDesc").addClass("is-invalid");
        }
        if(!this.date){
            this.date = "No due date";
        }
        if(!this.location){
            this.location = "No location";
        }

        return valid;
    }
}