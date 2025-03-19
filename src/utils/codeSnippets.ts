
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
  }
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
