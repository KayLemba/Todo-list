export default class List {
  constructor() {
    this.list = JSON.parse(localStorage.getItem('todo-list'));
    if (!this.list) {
      this.list = [];
    }
    this.display();
  }

  display() {
    for (let i = 0; i < this.list.length; i += 1) {
      this.list[i].index = i;
    }
    this.list.sort((a, b) => {
      if (a.index < b.index) return -1;
      if (a.index > b.index) return 1;
      return 0;
    });
    localStorage.setItem('todo-list', JSON.stringify(this.list));
    const listSection = document.querySelector('#list-items');
    listSection.innerHTML = '';
    for (let i = 0; i < this.list.length; i += 1) {
      const activity = this.list[i];
      let activityItem = `
        <li class="d-flex s-between list-item">`;
      if (activity.completed) {
        activityItem += `<span class="material-icons done update-status" data="${activity.index}">
              done
            </span>
            <p contenteditable="true" class="completed">
              ${activity.description}
            </p>
            `;
      } else {
        activityItem += ` <span class="material-icons  update-status"  data="${activity.index}">
              check_box_outline_blank
            </span>
            <p contenteditable="true">
              ${activity.description}
            </p>`;
      }
      activityItem += `
          <span class="material-icons">
            delete
            </span>
          <!-- <span class="material-icons">
            delete
          </span> -->
        </li>
      `;
      listSection.innerHTML += activityItem;
    }
    this.activateActions();
  }

  addActivity(activity) {
    if (activity || activity === 0) {
      const newActivity = {
        description: activity,
        completed: false,
        index: this.list.length,
      };
      this.list.push(newActivity);
      this.display();
    }
  }

  deleteActivity(activityIndex) {
    if (activityIndex) {
      this.list.splice(activityIndex, 1);
      this.display();
    }
  }

  updateActivityStatus(activityIndex) {
    if (activityIndex !== undefined) {
      if (this.list[activityIndex].completed === true) {
        this.list[activityIndex].completed = false;
      } else {
        this.list[activityIndex].completed = true;
      }
    }
    this.display();
  }

  clearCompleted() {
    this.list = this.list.filter((activity) => activity.completed === false);
    this.display();
  }

  activateActions() {
    const updateStatusBtns = document.querySelectorAll('.update-status');
    if (updateStatusBtns !== null) {
      updateStatusBtns.forEach((item) => {
        item.addEventListener('click', () => {
          this.updateActivityStatus(item.getAttribute('data'));
        });
      });
    }
  }
}