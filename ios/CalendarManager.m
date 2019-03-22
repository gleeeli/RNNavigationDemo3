//
//  CalendarManager.m
//  RNNavigationDemo3
//
//  Created by 小柠檬 on 2019/3/22.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "CalendarManager.h"
#import <React/RCTLog.h>
#import <React/RCTConvert.h>

@implementation CalendarManager
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name details:(NSDictionary *)details callBack:(RCTResponseSenderBlock)callback)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, details);
  
  NSString *userName = [RCTConvert NSString:details[@"userName"]];
  //NSDate *time = [RCTConvert NSDate:details[@"time"]];
  
  NSString *message = [NSString stringWithFormat:@"当前用户为:%@",userName];
  
  UIAlertController *vc  = [UIAlertController alertControllerWithTitle:@"OC的弹窗" message:message preferredStyle:UIAlertControllerStyleAlert];
  UIAlertAction *acttion = [UIAlertAction actionWithTitle:@"确定" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
    NSArray *events = @[@"点击了确定"];
    //回调给JS
    callback(@[[NSNull null], events]);
  }];
  
  [vc addAction:acttion];
  
  UIAlertAction *cancelActtion = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
    NSArray *events = @[@"点击了取消"];
    //回调给JS
    callback(@[[NSNull null], events]);
  }];
  [vc addAction:cancelActtion];
  
  UIWindow *window = [UIApplication sharedApplication].keyWindow;
  [window.rootViewController presentViewController:vc animated:YES completion:nil];
                            
}

- (NSDictionary *)constantsToExport
{
  return @{ @"OCConstVariable": @"我是OC里设置的常量" };
}
@end
