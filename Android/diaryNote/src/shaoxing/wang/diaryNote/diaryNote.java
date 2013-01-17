/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package shaoxing.wang.diaryNote;
import cn.domob.android.ads.DomobAdEventListener;
import cn.domob.android.ads.DomobAdManager.ErrorCode;
import cn.domob.android.ads.DomobAdView;
import android.app.Activity;
import android.os.Bundle;
import org.apache.cordova.*;
import android.widget.RelativeLayout;

public class diaryNote extends DroidGap
{
	DomobAdView mAdview320x50;
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
        
        
		mAdview320x50 = new DomobAdView(this, "56OJzsiYuNfnRWowr9", DomobAdView.INLINE_SIZE_320X50);
		RelativeLayout.LayoutParams layoutParam = new RelativeLayout.LayoutParams( RelativeLayout.LayoutParams.FILL_PARENT,RelativeLayout.LayoutParams.FILL_PARENT);
        this.addContentView(mAdview320x50, layoutParam);
        
        
    }
}

