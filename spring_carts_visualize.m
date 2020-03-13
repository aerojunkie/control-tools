% This script was hacked together poorly to make an animation for
% the YouTube video, "Robust Control, Part 4: Working with Uncertain
% Parameters". This is not intended to be 'good code', I just needed
% something that works! Please don't judge this harshly.
%
% Brian Douglas 2020

close all
clear all
h = figure;
h.Position = [141 379 1627 483];
% Start/end
plot([300, 300], [0 200], '--', 'LineWidth', 3, 'Color', 'k');
tt = title('Two-cart and spring system');
tt.FontSize = 35;
hold;
plot([600, 600], [0 200], '--', 'LineWidth', 3, 'Color', [0.2 0.7 0.2]);
axis equal
axis([0 700 0 200]);
grid on

ic = text(310, 160, 'Initial position');
ic.FontSize = 30;
ic.Color = 'k';

sp = text(610, 160, 'Set point');
sp.FontSize = 30;
sp.Color = [0.2 0.7 0.2];

m1 = 1;
m2 = 1;
k = 1;

G.A = [0, 1, 0, 0; -k/m1, 0, k/m1, 0; 0, 0, 0, 1; k/m2, 0 -k/m2, 0];
G.B = [0; 1/m1; 0; 0];
G.C = eye(4);
G.D = [0;0;0;0];
G = ss(G.A, G.B, G.C, G.D);

Q = [1 0 0 0;
     0 1 0 0;
     0 0 10 0;
     0 0 0 20];
R = 7;

K = lqr(G, Q, R);

Gcl = feedback(G, K);

[x, t] = step(Gcl);
x(:, 1) = x(:, 1)/x(end, 1);
x(:, 3) = x(:, 3)/x(end, 3);

force = 2000*diff(x(:, 2));


x_loc_1 = 50;
x_loc_2 = 250;
y_loc = 0;

rec_data = [
    0 10;
    0 50;
    100 50;
    100 10;
    0 10];

rec2_data = [
    0 10;
    0 50;
    46 50;
    46 75;
    54 75;
    54 50;
    100 50;
    100 10;
    0 10];

j = 0:.1:2*pi;
circ_data = 8*[sin(j') cos(j')];

% Cart 1
rec_draw1 = patch(rec2_data(:, 1) + x_loc_1, rec2_data(:, 2)+ y_loc , [0.4 0.4 0.4]);
circ_draw11 = patch(circ_data(:, 1) + x_loc_1 + 20, circ_data(:, 2) + y_loc + 8, [0.7 0.7 0.7]);
circ_draw12 = patch(circ_data(:, 1) + x_loc_1 + 80, circ_data(:, 2) + y_loc + 8, [0.7 0.7 0.7]);

% Cart 2
rec_draw2 = patch(rec_data(:, 1) + x_loc_2, rec_data(:, 2)+ y_loc , [0.4 0.4 0.4]);
circ_draw21 = patch(circ_data(:, 1) + x_loc_2 + 20, circ_data(:, 2) + y_loc + 8, [0.7 0.7 0.7]);
circ_draw22 = patch(circ_data(:, 1) + x_loc_2 + 80, circ_data(:, 2) + y_loc + 8, [0.7 0.7 0.7]);

% Spring
len = x_loc_2 - x_loc_1 - 100;
s1 = line([x_loc_1 + 100, x_loc_1 + 100 + len/6], [30 + y_loc, 30 + y_loc], 'LineWidth', 2);
s2 = line([x_loc_1 + 100 + len/6, x_loc_1 + 100 + 1.25*len/6], [30 + y_loc, 30 + y_loc + 10], 'LineWidth', 2);
s3 = line([x_loc_1 + 100 + 1.25*len/6, x_loc_1 + 100 + 1.75*len/6], [30 + y_loc + 10, 30 + y_loc - 10], 'LineWidth', 2);
s4 = line([x_loc_1 + 100 + 1.75*len/6, x_loc_1 + 100 + 2.25*len/6], [30 + y_loc - 10, 30 + y_loc + 10], 'LineWidth', 2);
s5 = line([x_loc_1 + 100 + 2.25*len/6, x_loc_1 + 100 + 2.75*len/6], [30 + y_loc + 10, 30 + y_loc - 10], 'LineWidth', 2);
s6 = line([x_loc_1 + 100 + 2.75*len/6, x_loc_1 + 100 + 3.25*len/6], [30 + y_loc - 10, 30 + y_loc + 10], 'LineWidth', 2);
s7 = line([x_loc_1 + 100 + 3.25*len/6, x_loc_1 + 100 + 3.75*len/6], [30 + y_loc + 10, 30 + y_loc - 10], 'LineWidth', 2);
s8 = line([x_loc_1 + 100 + 3.75*len/6, x_loc_1 + 100 + 4.25*len/6], [30 + y_loc - 10, 30 + y_loc + 10], 'LineWidth', 2);
s9 = line([x_loc_1 + 100 + 4.25*len/6, x_loc_1 + 100 + 4.75*len/6], [30 + y_loc + 10, 30 + y_loc - 10], 'LineWidth', 2);
s10 = line([x_loc_1 + 100 + 4.75*len/6, x_loc_1 + 100 + 5*len/6], [30 + y_loc - 10, 30 + y_loc], 'LineWidth', 2);
s11 = line([x_loc_1 + 100 + 5*len/6, x_loc_1 + 100 + len], [30 + y_loc, 30 + y_loc], 'LineWidth', 2);

% Force
l1 = plot([x_loc_1 + 50, x_loc_1 + 50], [70 + y_loc, 70 + y_loc], 'r', 'LineWidth', 6);

ft = text(x_loc_1 + 45, 85 + y_loc, 'f(t)');
ft.FontSize = 20;
ft.Color = 'r';

cart1 = text(x_loc_1 + 30, y_loc + 30, 'Cart 1');
cart1.FontSize = 25;
cart1.Color = 'w';

cart2 = text(x_loc_2 + 30, y_loc + 30, 'Cart 2');
cart2.FontSize = 25;
cart2.Color = 'w';

% %%%%%%%%%%%%%%
% mass2 = text(x_loc_2 + 31, y_loc + 17, 'Mass, m2');
% mass2.FontSize = 15;
% mass2.Color = 'w';
% 
% mass2 = text(x_loc_1 + 31, y_loc + 17, 'Mass, m1');
% mass2.FontSize = 15;
% mass2.Color = 'w';
% 
% spring = text(165, 50, 'Spring constant, k');
% spring.FontSize = 15;
% spring.Color = [0 0.52 0.86];


pause(1)

dist = 300;

for i = 1:length(t)-1
    
    % Cart 1
    rec_draw1.XData = rec2_data(:, 1) + x_loc_1 + dist*x(i, 1);
    circ_draw11.XData = circ_data(:, 1) + x_loc_1 + 20 + dist*x(i, 1);
    circ_draw12.XData = circ_data(:, 1) + x_loc_1 + 80 + dist*x(i, 1);
    
    % Cart 2
    rec_draw2.XData = rec_data(:, 1) + x_loc_2 + dist*x(i, 3);
    circ_draw21.XData = circ_data(:, 1) + x_loc_2 + 20 + dist*x(i, 3);
    circ_draw22.XData = circ_data(:, 1) + x_loc_2 + 80 + dist*x(i, 3);
    
    % Spring
    len = dist*x(i, 3) - dist*x(i, 1) + 100;
    s1.XData = [x_loc_1 + dist*x(i, 1) + 100, x_loc_1 + 100 + dist*x(i, 1) + len/6];
    s2.XData = [x_loc_1 + 100 + dist*x(i, 1) + len/6, x_loc_1 + 100 + dist*x(i, 1) + 1.25*len/6];
    s3.XData = [x_loc_1 + 100 + dist*x(i, 1) + 1.25*len/6, x_loc_1 + 100 + dist*x(i, 1) + 1.75*len/6];
    s4.XData = [x_loc_1 + 100 + dist*x(i, 1) + 1.75*len/6, x_loc_1 + 100 + dist*x(i, 1) + 2.25*len/6];
    s5.XData = [x_loc_1 + 100 + dist*x(i, 1) + 2.25*len/6, x_loc_1 + 100 + dist*x(i, 1) + 2.75*len/6];
    s6.XData = [x_loc_1 + 100 + dist*x(i, 1) + 2.75*len/6, x_loc_1 + 100 + dist*x(i, 1) + 3.25*len/6];
    s7.XData = [x_loc_1 + 100 + dist*x(i, 1) + 3.25*len/6, x_loc_1 + 100 + dist*x(i, 1) + 3.75*len/6];
    s8.XData = [x_loc_1 + 100 + dist*x(i, 1) + 3.75*len/6, x_loc_1 + 100 + dist*x(i, 1) + 4.25*len/6];
    s9.XData = [x_loc_1 + 100 + dist*x(i, 1) + 4.25*len/6, x_loc_1 + 100 + dist*x(i, 1) + 4.75*len/6];
    s10.XData = [x_loc_1 + 100 + dist*x(i, 1) + 4.75*len/6, x_loc_1 + 100 + dist*x(i, 1) + 5*len/6];
    s11.XData = [x_loc_1 + 100 + dist*x(i, 1) + 5*len/6, x_loc_1 + 100 + dist*x(i, 1) + len];

    l1.XData = [x_loc_1 + dist*x(i, 1) + 50, x_loc_1 + dist*x(i, 1) + 50 + force(i)];
    ft.Position = [x_loc_1 + dist*x(i, 1) + 45, 85 + y_loc]; 
    
    cart1.Position = [x_loc_1 + dist*x(i, 1) + 30,y_loc + 30];
    cart2.Position = [x_loc_2 + dist*x(i, 3) + 30,y_loc + 30];
    pause(0.08)
end