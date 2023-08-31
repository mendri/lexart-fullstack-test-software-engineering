import numpy as np


def electron_cyclotron(matrix):
    cyclotron = np.copy(matrix)
    cyclotron[0, :] = "e"
    cyclotron[:, -1] = "e"

    return cyclotron


def proton_cyclotron(matrix):
    cyclotron = np.copy(matrix)
    cyclotron[0, :] = "p"
    cyclotron[:, 0] = "p"
    cyclotron[-1, :] = "p"
    cyclotron[:, -1] = "p"
    cyclotron[-1, -1] = "1"
    cyclotron[-2, -2] = "p"

    return cyclotron


def neutron_cyclotron(matrix):
    cyclotron = np.copy(matrix)
    cyclotron[0, :] = "n"

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
