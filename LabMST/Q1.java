import java.util.ArrayList;
import java.util.Scanner;

// Custom Exception
class EmptyListException extends Exception {
    public EmptyListException(String message) {
        super(message);
    }
}

public class StudentList {
    private ArrayList<String> students = new ArrayList<>();

    // Method to add a student name
    public void addStudent(String name) {
        students.add(name);
        System.out.println(name + " added to the list.");
    }

    // Method to remove a student name
    public void removeStudent(String name) throws EmptyListException {
        if (students.isEmpty()) {
            throw new EmptyListException("Cannot remove. The student list is empty!");
        }
        if (students.remove(name)) {
            System.out.println(name + " removed from the list.");
        } else {
            System.out.println(name + " not found in the list.");
        }
    }

    // Method to display all students
    public void displayStudents() throws EmptyListException {
        if (students.isEmpty()) {
            throw new EmptyListException("The student list is empty!");
        }
        System.out.println("Students: " + students);
    }

    public static void main(String[] args) {
        StudentList list = new StudentList();
        Scanner sc = new Scanner(System.in);

        list.addStudent("Alice");
        list.addStudent("Bob");

        try {
            list.displayStudents();
            list.removeStudent("Alice");
            list.removeStudent("Charlie"); // not in list
            list.displayStudents();
            list.removeStudent("Bob");
            list.displayStudents(); // will throw exception
        } catch (EmptyListException e) {
            System.out.println("Error: " + e.getMessage());
        }

        sc.close();
    }
}
