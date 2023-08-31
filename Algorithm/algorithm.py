def electron_cyclotron(matrix):
    cyclotron = matrix

    for i in range(len(cyclotron)):
        cyclotron[0][i] = "e"
        cyclotron[i][-1] = "e"

    return cyclotron


def proton_cyclotron(matrix):
    cyclotron = matrix

    for i in range(len(cyclotron)):
        cyclotron[0][i] = "p"
        cyclotron[i][0] = "p"
        cyclotron[i][-1] = "p"
        cyclotron[-1][i] = "p"

    cyclotron[-2][-2] = "p"
    cyclotron[-1][-1] = "1"
    return cyclotron


def neutron_cyclotron(matrix):
    cyclotron = matrix

    for i in range(len(cyclotron)):
        cyclotron[0][i] = "n"

    return cyclotron


acceleration_functions = {
    "e": electron_cyclotron,
    "p": proton_cyclotron,
    "n": neutron_cyclotron,
}


def handle_cyclotron(particle, matrix):
    if particle in acceleration_functions:
        return acceleration_functions[particle](matrix)

    return matrix
