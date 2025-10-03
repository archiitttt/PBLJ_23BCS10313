import java.util.ArrayList;
import java.util.Scanner;

public class AverageCalculator {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ArrayList<Integer> numbers = new ArrayList<>();

        System.out.println("Enter integers (type 'done' to finish):");

        // Reading integers into ArrayList
        while (sc.hasNext()) {
            if (sc.hasNextInt()) {
                numbers.add(sc.nextInt());
            } else {
                String input = sc.next();
                if (input.equalsIgnoreCase("done")) {
                    break;
                } else {
                    System.out.println("Invalid input. Please enter integers only.");
                }
            }
        }

        try {
            if (numbers.isEmpty()) {
                throw new ArithmeticException("List is empty. Cannot calculate average.");
            }

            int sum = 0;
            for (int num : numbers) {
                sum += num;
            }
            double avg = (double) sum / numbers.size();
            System.out.println("Average = " + avg);

        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        }

        sc.close();
    }
}
