#include <iostream>
#include <ctime>

int main() {
	char output[50];
	time_t timestamp = time(NULL);
	struct tm datetime = *localtime(&timestamp);

	std::cout << "Hello, ASL!" << std::endl;
	strftime(output, 50, "%B %e, %Y", &datetime);
	std::cout << output << std::endl;

	return 0;
}
