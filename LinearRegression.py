import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from reformat_data import reformat_data
from sklearn.linear_model import LogisticRegression
from sklearn import preprocessing
from sklearn.metrics import accuracy_score

train_list = reformat_data("testdata.txt")
train_labels = []
train_features = []
test_features = []
real_labels = []

for i in range(len(train_list)):
    if i % 2 == 0:
        train_labels.append([int(train_list[i])])

    else:
        train_features.append(train_list[i][0])

test_list = reformat_data("second_data.txt")
for i in range(len(test_list)):
    if i % 2 == 0:
        real_labels.append([int(test_list[i])])
    else:
        test_features.append(train_list[i][0])

X_train = train_features
y_train = train_labels
std_scaler = preprocessing.StandardScaler()
std_scaler.fit(X_train)
X_train_fixed = std_scaler.transform(X_train)
logreg = LogisticRegression(penalty='none', solver='saga')
logreg.fit(X_train_fixed, y_train)
X_test = test_features
X_test_fixed = std_scaler.transform(X_test)
y_pred = logreg.predict(X_test_fixed)
print(accuracy_score(y_pred, real_labels))



