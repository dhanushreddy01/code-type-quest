import { Language } from "../components/LanguageSelector";

interface CodeSnippet {
  id: string;
  language: Language;
  code: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  description: string;
}

const codeSnippets: CodeSnippet[] = [
  // JavaScript Snippets
  {
    id: 'js-1',
    language: 'javascript',
    code: 
`function calculateFactorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * calculateFactorial(n - 1);
}

// Calculate factorial of 5
const result = calculateFactorial(5);
console.log(\`Factorial of 5 is \${result}\`);`,
    difficulty: 'beginner',
    title: 'Recursive Factorial',
    description: 'A simple recursive function to calculate factorials'
  },
  {
    id: 'js-2',
    language: 'javascript',
    code: 
`const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Using array methods
const evenNumbers = numbers.filter(num => num % 2 === 0);
const squaredNumbers = evenNumbers.map(num => num * num);
const sum = squaredNumbers.reduce((total, num) => total + num, 0);

console.log("Even numbers:", evenNumbers);
console.log("Squared even numbers:", squaredNumbers);
console.log("Sum of squared even numbers:", sum);`,
    difficulty: 'beginner',
    title: 'Array Methods',
    description: 'Using filter, map, and reduce for array manipulation'
  },
  {
    id: 'js-3',
    language: 'javascript',
    code: 
`class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return \`Hello, my name is \${this.name} and I am \${this.age} years old.\`;
  }
}

class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }

  study() {
    return \`\${this.name} is studying hard for grade \${this.grade}.\`;
  }
}

const student = new Student("Alex", 20, "A");
console.log(student.greet());
console.log(student.study());`,
    difficulty: 'intermediate',
    title: 'Classes and Inheritance',
    description: 'Using ES6 classes with inheritance'
  },
  
  // TypeScript Snippets
  {
    id: 'ts-1',
    language: 'typescript',
    code: 
`interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
}

function createUser(name: string, email: string, age?: number): User {
  const id = Math.floor(Math.random() * 1000);
  return {
    id,
    name,
    email,
    ...(age && { age }) // Conditionally add age if provided
  };
}

const user1 = createUser("Alice", "alice@example.com", 28);
const user2 = createUser("Bob", "bob@example.com");

console.log(user1);
console.log(user2);`,
    difficulty: 'beginner',
    title: 'TypeScript Interfaces',
    description: 'Using interfaces to define object types'
  },
  {
    id: 'ts-2',
    language: 'typescript',
    code: 
`type Status = 'pending' | 'fulfilled' | 'rejected';

interface Task<T> {
  id: string;
  status: Status;
  data?: T;
  error?: Error;
}

function createTask<T>(data?: T): Task<T> {
  return {
    id: Math.random().toString(36).substr(2, 9),
    status: 'pending',
    data
  };
}

function completeTask<T>(task: Task<T>, data: T): Task<T> {
  return {
    ...task,
    status: 'fulfilled',
    data
  };
}

function failTask<T>(task: Task<T>, error: Error): Task<T> {
  return {
    ...task,
    status: 'rejected',
    error
  };
}

// Example usage
const task = createTask<string>();
console.log("New task:", task);

const completedTask = completeTask(task, "Task completed successfully");
console.log("Completed task:", completedTask);

const failedTask = failTask(task, new Error("Something went wrong"));
console.log("Failed task:", failedTask);`,
    difficulty: 'intermediate',
    title: 'TypeScript Generics',
    description: 'Using generics with union types and type narrowing'
  },
  
  // Python Snippets
  {
    id: 'py-1',
    language: 'python',
    code: 
`def fibonacci(n):
    """Generate the Fibonacci sequence up to n terms."""
    sequence = []
    a, b = 0, 1
    for _ in range(n):
        sequence.append(a)
        a, b = b, a + b
    return sequence

# Generate first 10 Fibonacci numbers
fib_numbers = fibonacci(10)
print(f"First 10 Fibonacci numbers: {fib_numbers}")

# Calculate the sum
total = sum(fib_numbers)
print(f"Sum of the first 10 Fibonacci numbers: {total}")`,
    difficulty: 'beginner',
    title: 'Fibonacci Sequence',
    description: 'Generate the Fibonacci sequence using Python'
  },
  {
    id: 'py-2',
    language: 'python',
    code: 
`class Stack:
    """A simple Stack implementation using a Python list."""
    
    def __init__(self):
        self.items = []
    
    def push(self, item):
        """Add an item to the top of the stack."""
        self.items.append(item)
    
    def pop(self):
        """Remove and return the top item from the stack."""
        if not self.is_empty():
            return self.items.pop()
        return None
    
    def peek(self):
        """Return the top item without removing it."""
        if not self.is_empty():
            return self.items[-1]
        return None
    
    def is_empty(self):
        """Check if the stack is empty."""
        return len(self.items) == 0
    
    def size(self):
        """Return the number of items in the stack."""
        return len(self.items)


# Create a new stack
stack = Stack()

# Add items to the stack
stack.push("apple")
stack.push("banana")
stack.push("cherry")

# Check stack operations
print(f"Stack size: {stack.size()}")
print(f"Top item: {stack.peek()}")
print(f"Popped item: {stack.pop()}")
print(f"Stack size after pop: {stack.size()}")`,
    difficulty: 'intermediate',
    title: 'Stack Implementation',
    description: 'A simple Stack data structure in Python'
  },
  
  // Java Snippets
  {
    id: 'java-1',
    language: 'java',
    code: 
`public class BubbleSort {
    public static void main(String[] args) {
        int[] array = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Original array:");
        printArray(array);
        
        bubbleSort(array);
        
        System.out.println("Sorted array:");
        printArray(array);
    }
    
    // Bubble sort implementation
    static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap arr[j] and arr[j+1]
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
    
    // Print array elements
    static void printArray(int[] arr) {
        for (int value : arr) {
            System.out.print(value + " ");
        }
        System.out.println();
    }
}`,
    difficulty: 'beginner',
    title: 'Bubble Sort',
    description: 'Implementation of bubble sort algorithm in Java'
  },
  
  // C++ Snippets
  {
    id: 'cpp-1',
    language: 'cpp',
    code: 
`#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    // Create a vector of integers
    vector<int> numbers = {5, 2, 8, 1, 9, 3, 7, 4, 6};
    
    cout << "Original vector:" << endl;
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    // Sort the vector
    sort(numbers.begin(), numbers.end());
    
    cout << "Sorted vector:" << endl;
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    // Find an element
    int target = 7;
    auto it = find(numbers.begin(), numbers.end(), target);
    
    if (it != numbers.end()) {
        cout << "Found " << target << " at position: " 
             << (it - numbers.begin()) << endl;
    } else {
        cout << target << " not found" << endl;
    }
    
    return 0;
}`,
    difficulty: 'beginner',
    title: 'Vector Operations',
    description: 'Basic vector operations in C++'
  },
  
  // C# Snippets
  {
    id: 'csharp-1',
    language: 'csharp',
    code: 
`using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main(string[] args)
    {
        // Create a list of integers
        List<int> numbers = new List<int> { 5, 10, 15, 20, 25, 30 };
        
        Console.WriteLine("Original list:");
        PrintList(numbers);
        
        // LINQ operations
        var evenNumbers = numbers.Where(n => n % 2 == 0).ToList();
        var doubledNumbers = numbers.Select(n => n * 2).ToList();
        var sum = numbers.Sum();
        var average = numbers.Average();
        
        Console.WriteLine("\\nEven numbers:");
        PrintList(evenNumbers);
        
        Console.WriteLine("\\nDoubled numbers:");
        PrintList(doubledNumbers);
        
        Console.WriteLine($"\\nSum: {sum}");
        Console.WriteLine($"Average: {average}");
    }
    
    static void PrintList<T>(List<T> list)
    {
        foreach (var item in list)
        {
            Console.Write($"{item} ");
        }
        Console.WriteLine();
    }
}`,
    difficulty: 'beginner',
    title: 'LINQ Operations',
    description: 'Basic LINQ operations in C#'
  },

  // HTML Snippets
  {
    id: 'html-1',
    language: 'html',
    code: 
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <section id="home">
      <h1>Welcome to My Website</h1>
      <p>This is a sample HTML webpage</p>
    </section>
  </main>

  <footer>
    <p>&copy; 2023 My Website. All rights reserved.</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>`,
    difficulty: 'beginner',
    title: 'Basic HTML Structure',
    description: 'A simple HTML webpage structure with navigation'
  },

  // CSS Snippets
  {
    id: 'css-1',
    language: 'css',
    code: 
`/* Reset some default styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f4f4f4;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

header {
  background-color: #35424a;
  color: white;
  padding: 20px 0;
}

nav ul {
  display: flex;
  list-style: none;
}

nav ul li {
  margin-right: 20px;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 10px;
}

nav a:hover {
  background-color: #4e6075;
  border-radius: 3px;
}`,
    difficulty: 'beginner',
    title: 'CSS Styling Basics',
    description: 'Basic CSS styling for a responsive website'
  },

  // React.js Snippets
  {
    id: 'reactjs-1',
    language: 'reactjs',
    code: 
`import React, { useState, useEffect } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setCount(count => count + 1);
      }, 1000);
    } else if (!isActive && count !== 0) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isActive, count]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setCount(0);
    setIsActive(false);
  };

  return (
    <div className="counter">
      <h2>React Counter: {count}</h2>
      <div className="buttons">
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Counter;`,
    difficulty: 'intermediate',
    title: 'React Counter with Hooks',
    description: 'A counter component using React hooks'
  },

  // Node.js Snippets
  {
    id: 'nodejs-1',
    language: 'nodejs',
    code: 
`const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

app.post('/api/users', (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(user);
  res.status(201).json(user);
});

// Start server
app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});`,
    difficulty: 'intermediate',
    title: 'Express.js REST API',
    description: 'A simple REST API using Express.js'
  },

  // R Programming Snippets
  {
    id: 'r-1',
    language: 'r',
    code: 
`# Load libraries
library(ggplot2)
library(dplyr)

# Create sample data
set.seed(123)
data <- data.frame(
  group = rep(c("A", "B", "C"), each = 50),
  value = c(rnorm(50, mean = 5, sd = 1),
            rnorm(50, mean = 7, sd = 1.5),
            rnorm(50, mean = 9, sd = 1.2))
)

# Data summary
summary_stats <- data %>%
  group_by(group) %>%
  summarize(
    count = n(),
    mean = mean(value),
    sd = sd(value),
    median = median(value),
    min = min(value),
    max = max(value)
  )

print(summary_stats)

# Create a box plot
ggplot(data, aes(x = group, y = value, fill = group)) +
  geom_boxplot(alpha = 0.7) +
  geom_jitter(width = 0.2, alpha = 0.5) +
  labs(title = "Box Plot of Values by Group",
       x = "Group",
       y = "Value") +
  theme_minimal() +
  scale_fill_brewer(palette = "Pastel1")`,
    difficulty: 'intermediate',
    title: 'R Data Analysis',
    description: 'Data analysis and visualization in R'
  },

  // React Native Snippets
  {
    id: 'reactnative-1',
    language: 'reactnative',
    code: 
`import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';

const TodoApp = () => {
  const [todos, setTodos] = useState([
    { id: '1', text: 'Learn React Native', completed: false },
    { id: '2', text: 'Create a Todo App', completed: true },
    { id: '3', text: 'Share with friends', completed: false },
  ]);

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.todoItem}
      onPress={() => toggleTodo(item.id)}
    >
      <View style={[styles.checkbox, item.completed && styles.completed]} />
      <Text
        style={[
          styles.todoText,
          item.completed && styles.completedText,
        ]}
      >
        {item.text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'white',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#3498db',
    marginRight: 10,
  },
  completed: {
    backgroundColor: '#3498db',
  },
  todoText: {
    fontSize: 16,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});

export default TodoApp;`,
    difficulty: 'intermediate',
    title: 'React Native Todo App',
    description: 'A simple Todo application using React Native'
  },

  // Next.js Snippets
  {
    id: 'nextjs-1',
    language: 'nextjs',
    code: 
`import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <Head>
        <title>Next.js Blog</title>
        <meta name="description" content="A simple blog built with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Next.js Blog</h1>
        
        <div className="search">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid">
          {filteredPosts.map((post) => (
            <Link href={\`/posts/\${post.id}\`} key={post.id}>
              <div className="card">
                <h2>{post.title}</h2>
                <p>{post.body.substring(0, 100)}...</p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <style jsx>{
        /* CSS styles would go here */
      }</style>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch data from an API
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts: Post[] = await res.json();

  return {
    props: {
      posts: posts.slice(0, 10), // Get first 10 posts
    },
  };
};`,
    difficulty: 'intermediate',
    title: 'Next.js Blog Page',
    description: 'A blog home page built with Next.js'
  },

  // Golang Snippets
  {
    id: 'golang-1',
    language: 'golang',
    code: 
`package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

// Book struct (Model)
type Book struct {
	ID     string  \`json:"id"\`
	Title  string  \`json:"title"\`
	Author string  \`json:"author"\`
	Price  float64 \`json:"price"\`
}

// Init books var as a slice Book struct
var books []Book

// Get all books
func getBooks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(books)
}

// Get single book
func getBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r) // Get params
	
	// Loop through books and find with id
	for _, item := range books {
		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	json.NewEncoder(w).Encode(&Book{})
}

// Add new book
func createBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var book Book
	_ = json.NewDecoder(r.Body).Decode(&book)
	book.ID = strconv.Itoa(len(books) + 1) // Mock ID - not safe for production
	books = append(books, book)
	json.NewEncoder(w).Encode(book)
}

func main() {
	// Init router
	r := mux.NewRouter()

	// Mock data
	books = append(books, Book{ID: "1", Title: "The Go Programming Language", Author: "Alan A. A. Donovan", Price: 36.99})
	books = append(books, Book{ID: "2", Title: "Go in Action", Author: "William Kennedy", Price: 29.99})

	// Route handlers / endpoints
	r.HandleFunc("/api/books", getBooks).Methods("GET")
	r.HandleFunc("/api/books/{id}", getBook).Methods("GET")
	r.HandleFunc("/api/books", createBook).Methods("POST")

	// Start server
	fmt.Println("Server running on port 8000")
	log.Fatal(http.ListenAndServe(":8000", r))
}`,
    difficulty: 'intermediate',
    title: 'Go REST API',
    description: 'A simple REST API in Go using Gorilla Mux'
  },

  // Ruby Snippets
  {
    id: 'ruby-1',
    language: 'ruby',
    code: 
`class BankAccount
  attr_reader :balance, :account_number, :transactions

  def initialize(account_number)
    @account_number = account_number
    @balance = 0
    @transactions = []
  end

  def deposit(amount)
    raise ArgumentError, "Amount must be positive" unless amount > 0
    
    @balance += amount
    add_transaction("deposit", amount)
    puts "Deposited $#{amount}. New balance: $#{@balance}"
    @balance
  end

  def withdraw(amount)
    raise ArgumentError, "Amount must be positive" unless amount > 0
    raise "Insufficient funds" if amount > @balance
    
    @balance -= amount
    add_transaction("withdrawal", amount)
    puts "Withdrew $#{amount}. New balance: $#{@balance}"
    @balance
  end

  def transfer(recipient, amount)
    raise "Cannot transfer to same account" if recipient.account_number == @account_number
    
    withdraw(amount)
    recipient.deposit(amount)
    puts "Transferred $#{amount} to account ##{recipient.account_number}"
    true
  end

  def transaction_history
    puts "Transaction History for Account ##{@account_number}"
    puts "----------------------------------------"
    
    @transactions.each_with_index do |transaction, index|
      puts "##{index + 1} | #{transaction[:date]} | #{transaction[:type].capitalize}: $#{transaction[:amount]} | Balance: $#{transaction[:balance]}"
    end
  end

  private

  def add_transaction(type, amount)
    @transactions << {
      type: type,
      amount: amount,
      date: Time.now,
      balance: @balance
    }
  end
end

# Example usage
if __FILE__ == $0
  # Create two accounts
  account1 = BankAccount.new("12345")
  account2 = BankAccount.new("67890")

  # Perform some transactions
  account1.deposit(1000)
  account1.withdraw(200)
  account1.transfer(account2, 300)

  # Display transaction history
  puts "\n"
  account1.transaction_history
  puts "\n"
  account2.transaction_history
end`,
    difficulty: 'intermediate',
    title: 'Ruby Bank Account',
    description: 'Object-oriented bank account system in Ruby'
  },

  // PHP Snippets
  {
    id: 'php-1',
    language: 'php',
    code: 
`<?php
class TodoList {
    private $tasks = [];
    
    public function addTask($description, $priority = 'medium') {
        $task = [
            'id' => uniqid(),
            'description' => $description,
            'completed' => false,
            'created_at' => date('Y-m-d H:i:s'),
            'priority' => $priority
        ];
        
        $this->tasks[] = $task;
        return $task['id'];
    }
    
    public function completeTask($id) {
        foreach ($this->tasks as &$task) {
            if ($task['id'] === $id) {
                $task['completed'] = true;
                $task['completed_at'] = date('Y-m-d H:i:s');
                return true;
            }
        }
        return false;
    }
    
    public function removeTask($id) {
        foreach ($this->tasks as $key => $task) {
            if ($task['id'] === $id) {
                unset($this->tasks[$key]);
                $this->tasks = array_values($this->tasks); // Reindex the array
                return true;
            }
        }
        return false;
    }
    
    public function getCompletedTasks() {
        return array_filter($this->tasks, function($task) {
            return $task['completed'] === true;
        });
    }
    
    public function getPendingTasks() {
        return array_filter($this->tasks, function($task) {
            return $task['completed'] === false;
        });
    }
    
    public function getAllTasks() {
        return $this->tasks;
    }
    
    public function displayTasks() {
        echo "TODO LIST\n";
        echo "=========\n\n";
        
        echo "PENDING TASKS:\n";
        foreach ($this->getPendingTasks() as $task) {
            echo "- [{$task['priority']}] {$task['description']} (Created: {$task['created_at']})\n";
        }
        
        echo "\nCOMPLETED TASKS:\n";
        foreach ($this->getCompletedTasks() as $task) {
            echo "- {$task['description']} (Completed: {$task['completed_at']})\n";
        }
    }
}

// Example usage
$todoList = new TodoList();

// Add some tasks
$task1 = $todoList->addTask('Complete PHP assignment', 'high');
$task2 = $todoList->addTask('Buy groceries');
$task3 = $todoList->addTask('Call dentist', 'low');

// Complete a task
$todoList->completeTask($task2);

// Display all tasks
$todoList->displayTasks();
?>`,
    difficulty: 'intermediate',
    title: 'PHP Todo List',
    description: 'A todo list implementation in PHP'
  },

  // Swift Snippets
  {
    id: 'swift-1',
    language: 'swift',
    code: 
`import UIKit

// Weather model
struct Weather {
    let temperature: Double
    let condition: String
    let humidity: Int
    let windSpeed: Double
    
    var temperatureString: String {
        return String(format: "%.1f°C", temperature)
    }
}

// City model
struct City {
    let name: String
    let country: String
    var weather: Weather?
}

// Weather service
class WeatherService {
    func fetchWeather(for city: String, completion: @escaping (Weather?) -> Void) {
        // In a real app, this would make an API request
        // For this example, we'll simulate with a delay
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
            // Simulate random weather data
            let conditions = ["Sunny", "Cloudy", "Rainy", "Snowy", "Windy"]
            let randomCondition = conditions.randomElement() ?? "Sunny"
            let randomTemp = Double.random(in: -10...35)
            let randomHumidity = Int.random(in: 30...90)
            let randomWindSpeed = Double.random(in: 0...30)
            
            let weather = Weather(
                temperature: randomTemp,
                condition: randomCondition,
                humidity: randomHumidity,
                windSpeed: randomWindSpeed
            )
            
            completion(weather)
        }
    }
}

// View Controller
class WeatherViewController: UIViewController {
    let weatherService = WeatherService()
    var cities: [City] = [
        City(name: "London", country: "UK"),
        City(name: "Paris", country: "France"),
        City(name: "New York", country: "USA"),
        City(name: "Tokyo", country: "Japan")
    ]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        fetchWeatherForAllCities()
    }
    
    func setupUI() {
        // This would set up UI components in a real app
        title = "Weather App"
        view.backgroundColor = .systemBackground
    }
    
    func fetchWeatherForAllCities() {
        for (index, city) in cities.enumerated() {
            weatherService.fetchWeather(for: city.name) { [weak self] weather in
                guard let self = self, let weather = weather else { return }
                
                // Update the city with weather information
                self.cities[index].weather = weather
                
                // This would update the UI in a real app
                print("\\(city.name), \\(city.country): \\(weather.temperatureString), \\(weather.condition)")
            }
        }
    }
    
    func displayWeatherDetails(for city: City) {
        guard let weather = city.weather else {
            print("Weather information not available for \\(city.name)")
            return
        }
        
        print("\\nWeather Details for \\(city.name), \\(city.country)")
        print("Temperature: \\(weather.temperatureString)")
        print("Condition: \\(weather.condition)")
        print("Humidity: \\(weather.humidity)%")
        print("Wind Speed: \\(weather.windSpeed) km/h")
    }
}

// Simulate app execution
let viewController = WeatherViewController()
viewController.viewDidLoad()

// Simulate user selecting a city after data is loaded
DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) {
    if let london = viewController.cities.first(where: { $0.name == "London" }) {
        viewController.displayWeatherDetails(for: london)
    }
}`,
    difficulty: 'intermediate',
    title: 'Swift Weather App',
    description: 'A weather application in Swift'
  },
];

/**
 * Get code snippets for a specific language
 */
export const getSnippetsByLanguage = (language: Language): CodeSnippet[] => {
  return codeSnippets.filter(snippet => snippet.language === language);
};

/**
 * Get a random code snippet for a specific language
 */
export const getRandomSnippet = (language: Language): CodeSnippet => {
  const filteredSnippets = getSnippetsByLanguage(language);
  
  // If there are no snippets for the selected language, return a default JavaScript snippet
  if (filteredSnippets.length === 0) {
    return codeSnippets.find(snippet => snippet.language === 'javascript') || codeSnippets[0];
  }
  
  const randomIndex = Math.floor(Math.random() * filteredSnippets.length);
  return filteredSnippets[randomIndex];
};

/**
 * Get a specific code snippet by ID
 */
export const getSnippetById = (id: string): CodeSnippet | undefined => {
  return codeSnippets.find(snippet => snippet.id === id);
};

export default codeSnippets;
