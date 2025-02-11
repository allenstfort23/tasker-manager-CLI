#!/usr/bin/env node

const { Command } = require("commander");
const program = new Command();
const fs = require("fs");
const taskFile = "tasks.json";

// Define the task manager CLI
program.version("1.0.0").description("A simple task manager CLI");

// Example command
program
  .command("list")
  .description("List all tasks")
  .action(() => {
    console.log("Listing all task...");
    if (fs.existsSync(taskFile)) {
      const tasks = JSON.parse(fs.readFileSync(taskFile));
      tasks.forEach((tasks) => {
        console.log(`- ${tasks.task}`);
      });
    } else {
      console.log("No Task found");
    }
  });

program
  .command("add <task>")
  .description("Add a new task")
  .action((task) => {
    let tasks = [];
    if (fs.existsSync(taskFile)) {
      tasks = JSON.parse(fs.readFileSync(taskFile));
    }
    tasks.push({ task, completed: false });
    fs.writeFileSync(taskFile, JSON.stringify(tasks, null, 2));
    console.log(`Added task: ${task}`);
  });

program
  .command("delete <task>")
  .description("Delete task")
  .action((task) => {
    if (fs.existsSync(taskFile)) {
      tasks = JSON.parse(fs.readFileSync(taskFile));

      const taskIndex = tasks.findIndex((t) => t.task === task);

      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        fs.writeFileSync(taskFile, JSON.stringify(tasks, null, 2));
        console.log(`Deleted task ${task}`);
      } else {
        console.log(`Task "${task}" not found.`);
      }
    } else {
      console.log("No tasks found.");
    }
    console.log(`Deleted task ${task}`);
  });

// Parse the argument
program.parse(process.argv);
