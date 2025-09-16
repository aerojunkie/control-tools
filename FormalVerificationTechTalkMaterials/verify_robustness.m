% Define weights and biases
W1 = [1, 1; 1, -1];
b1 = [0; 0];

W2 = [1, 1; 1, -1];
b2 = [0; 0];

W3 = [1, 1; 0, 1];
b3 = [1; 0];

% Build layers with manual weights
layers = [
    featureInputLayer(2, 'Name', 'input')
    fullyConnectedLayer(2, 'Name', 'fc1', 'Weights', W1, 'Bias', b1)
    reluLayer('Name', 'relu1')
    fullyConnectedLayer(2, 'Name', 'fc2', 'Weights', W2, 'Bias', b2)
    reluLayer('Name', 'relu2')
    fullyConnectedLayer(2, 'Name', 'fc3', 'Weights', W3, 'Bias', b3)
    ];

lgraph = layerGraph(layers);

% Convert to dlnetwork
net = dlnetwork(lgraph);

% Input bounds (region to verify)
XLower = dlarray([-1; -1], 'CB');
XUpper = dlarray([ 1;  1], 'CB');

% Verify
isRobust = verifyNetworkRobustness(net, XLower, XUpper, 1);
