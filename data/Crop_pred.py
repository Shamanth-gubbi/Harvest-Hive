import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.tree import DecisionTreeRegressor
from sklearn.metrics import accuracy_score

# Reading the csv file
data = pd.read_csv('cpdata.csv')
print(data.head(1))

# Creating dummy variable for target i.e label
label = pd.get_dummies(data.label).iloc[:, 1:]
data = pd.concat([data, label], axis=1)
data.drop('label', axis=1, inplace=True)
print('The data present in one row of the dataset is')
print(data.head(1))

train = data.iloc[:, 0:4].values
test = data.iloc[:, 4:].values

# Dividing the data into training and test set
X_train, X_test, y_train, y_test = train_test_split(train, test, test_size=0.3)

sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

# Importing Decision Tree classifier
clf = DecisionTreeRegressor()

# Fitting the classifier into training set
clf.fit(X_train, y_train)
pred = clf.predict(X_test)

# Finding the accuracy of the model
a = accuracy_score(y_test, pred)
print("The accuracy of this model is:", a * 100)

# Data to be tested
ah = 80
atemp = 25
shum = 40
pH = 6.5
rain = 10

predictcrop = [[ah, atemp, shum, pH, rain]]

# Putting the names of crop in a single list
crops = ['wheat', 'mungbean', 'Tea', 'millet', 'maize', 'lentil', 'jute', 'cofee', 'cotton', 'ground nut', 'peas',
         'rubber', 'sugarcane', 'tobacco', 'kidney beans', 'moth beans', 'coconut', 'blackgram', 'adzuki beans',
         'pigeon peas', 'chick peas', 'banana', 'grapes', 'apple', 'mango', 'muskmelon', 'orange', 'papaya',
         'watermelon', 'pomegranate']
cr = 'rice'

# Predicting the crop
predictions = clf.predict(predictcrop)
count = 0
for i in range(0, 30):
    if predictions[0][i] == 1:
        c = crops[i]
        count = count + 1
        break
    i = i + 1
if count == 0:
    print('The predicted crop is %s' % cr)
else:
    print('The predicted crop is %s' % c)
